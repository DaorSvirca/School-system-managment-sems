package dev.babat.sems.schoolsystem0managementsems.services;

import dev.babat.sems.schoolsystem0managementsems.dtos.StudentDto;
import dev.babat.sems.schoolsystem0managementsems.enums.GenderEnum;

import java.util.List;

public interface StudentService extends BaseService<StudentDto, Long> {
    long getUserCountByGender(GenderEnum genderEnum);
}
