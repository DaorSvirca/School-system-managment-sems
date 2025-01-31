package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.StudentDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.UserDto;
import dev.babat.sems.schoolsystem0managementsems.entities.AddressEntity;
import dev.babat.sems.schoolsystem0managementsems.entities.RoleEntity;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.enums.RoleNameEnum;
import dev.babat.sems.schoolsystem0managementsems.mappers.UserMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.AddressRepository;
import dev.babat.sems.schoolsystem0managementsems.repositories.RoleRepository;
import dev.babat.sems.schoolsystem0managementsems.repositories.UserRepository;
import dev.babat.sems.schoolsystem0managementsems.security.SecurityConfig;
import dev.babat.sems.schoolsystem0managementsems.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;
    private final AddressRepository addressRepository;
    private final SecurityConfig securityConfig;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> findAll() {
        var users = userRepository.findAll();
        return userMapper.toDtoList(users);
    }

    @Override
    @EntityGraph(attributePaths = {"roleId", "addressId"})
    public UserDto findById(Long id) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserDto add(UserDto entity) {


        var user = userMapper.toEntity(entity);

        user.setPassword(passwordEncoder.encode(entity.getPassword()));

        RoleEntity role = roleRepository.findById(entity.getRoleId().getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRoleId(role);

        AddressEntity address = addressRepository.findById(entity.getAddressId().getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        user.setAddressId(address);
        var savedUsers = userRepository.save(user);
        return userMapper.toDto(savedUsers);
    }

    @Override
    public void deleteById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDto modify(Long id, UserDto entity) {
        if (!id.equals(entity.getUserId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var users = userMapper.toEntity(entity);
        var updatedUsers = userRepository.save(users);
        return userMapper.toDto(updatedUsers);
    }

    @Override
    public UserEntity findByEmail(String email) {
        Optional<UserEntity> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    @Override
    public List<UserDto> findByRoleId(RoleNameEnum role) {
        List<UserEntity> users = userRepository.findByRoleName(role);
        return userMapper.toDtoList(users);
    }


}
