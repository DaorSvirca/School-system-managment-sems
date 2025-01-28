package dev.babat.sems.schoolsystem0managementsems.mappers;

import dev.babat.sems.schoolsystem0managementsems.dtos.ProfessorDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.StudentDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.UserDto;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(UserEntity userEntity);
    UserEntity toEntity(UserDto userDto);
    List<UserDto> toDtoList(List<UserEntity> userEntities);
    List<UserEntity> toEntityList(List<UserDto> userDtos);


    // Special mappings for StudentDto
    @Mapping(source = "groupId", target = "groupId")
    @Mapping(source = "academicYearId", target = "academicYearId")
    @Mapping(source = "subjects", target = "subjectsId")
    StudentDto toStudentDto(UserEntity userEntity);

    // Special mappings for ProfessorDto
    @Mapping(source = "academicYearId", target = "academicYearId")
    ProfessorDto toProfessorDto(UserEntity userEntity);

}
