package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.CreateUserDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.LoginDto;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.security.SecurityConfig;
import dev.babat.sems.schoolsystem0managementsems.services.AuthService;
import dev.babat.sems.schoolsystem0managementsems.services.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final SecurityConfig securityConfig;



    @Override
    public UserEntity register(CreateUserDto createUserDto) {
        return null;
    }

    @Override
    public UserEntity login(LoginDto loginDto) {
        return null;
    }

    @Override
    public UserEntity authenticateUser(LoginDto loginDto) throws BadRequestException {
        var user = userService.findByEmail(loginDto.getEmail());
        if (user == null) {
            throw new BadRequestException("User not found");
        }
        if (!securityConfig.passwordEncoder().matches(loginDto.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid password");
        }
        return user;

    }
}
