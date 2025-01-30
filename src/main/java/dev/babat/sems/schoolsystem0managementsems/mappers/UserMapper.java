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
    @Mapping(source = "roleId", target = "roleId")
    @Mapping(source = "addressId", target = "addressId")
    UserDto toDto(UserEntity userEntity);
    UserEntity toEntity(UserDto userDto);
    List<UserDto> toDtoList(List<UserEntity> userEntities);
    List<UserEntity> toEntityList(List<UserDto> userDtos);


    @Mapping(source = "groupId", target = "groupId")
    @Mapping(source = "semesterId", target = "semesterId")
    StudentDto toStudentDto(UserEntity userEntity);


    ProfessorDto toProfessorDto(UserEntity userEntity);

    List<StudentDto> toStudentDtoList(List<UserEntity> userEntities);
    List<ProfessorDto> toProfessorDtoList(List<UserEntity> userEntities);

}
