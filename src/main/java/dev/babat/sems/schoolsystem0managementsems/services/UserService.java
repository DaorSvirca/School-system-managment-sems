package dev.babat.sems.schoolsystem0managementsems.services;

import dev.babat.sems.schoolsystem0managementsems.dtos.UserDto;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;

public interface UserService extends BaseService<UserDto, Long> {
    UserEntity findByEmail(String email);

}
