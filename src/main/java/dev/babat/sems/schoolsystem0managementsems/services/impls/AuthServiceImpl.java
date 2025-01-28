package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.CreateUserDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.LoginDto;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.services.AuthService;
import dev.babat.sems.schoolsystem0managementsems.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserService userService;


    @Override
    public UserEntity register(CreateUserDto createUserDto) {
        return null;
    }

    @Override
    public UserEntity login(LoginDto loginDto) {
        return null;
    }

    @Override
    public UserEntity authenticateUser(LoginDto loginDto) {
        var user = userService.findByEmail(loginDto.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (!user.getPassword().equals(loginDto.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return user;

    }
}
