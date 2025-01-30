package dev.babat.sems.schoolsystem0managementsems.services;

import dev.babat.sems.schoolsystem0managementsems.dtos.UserDto;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.enums.GenderEnum;

public interface UserService extends BaseService<UserDto, Long> {
    UserEntity findByEmail(String email);


}
