package dev.babat.sems.schoolsystem0managementsems.services;

import dev.babat.sems.schoolsystem0managementsems.dtos.StudentDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.UserDto;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.enums.RoleNameEnum;

import java.util.List;

public interface UserService extends BaseService<UserDto, Long> {
    UserEntity findByEmail(String email);

    List<UserDto> findByRoleId(RoleNameEnum role);



}
