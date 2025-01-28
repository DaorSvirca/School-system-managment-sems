package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.UserDto;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.mappers.UserMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.UserRepository;
import dev.babat.sems.schoolsystem0managementsems.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    @Override
    public List<UserDto> findAll() {
        var users = userRepository.findAll();
        return userMapper.toDtoList(users);
    }

    @Override
    public UserDto findById(Long id) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserDto add(UserDto entity) {
        var users = userMapper.toEntity(entity);
        var savedUsers = userRepository.save(users);
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
}
