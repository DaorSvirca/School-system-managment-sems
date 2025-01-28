package dev.babat.sems.schoolsystem0managementsems.services;

import dev.babat.sems.schoolsystem0managementsems.dtos.CreateUserDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.LoginDto;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;

public interface AuthService {
    UserEntity register(CreateUserDto createUserDto);
    UserEntity login(LoginDto loginDto);

    UserEntity authenticateUser(LoginDto loginDto);
}
