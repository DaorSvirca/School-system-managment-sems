package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.UserDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.UserMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.UserRepository;
import dev.babat.sems.schoolsystem0managementsems.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


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
    public UserDto findById(Long aLong) {
        return null;
    }

    @Override
    public UserDto add(UserDto entity) {
        var users = userMapper.toEntity(entity);
        var savedUsers = userRepository.save(users);
        return userMapper.toDto(savedUsers);
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public UserDto modify(Long aLong, UserDto entity) {
        return null;
    }
}
