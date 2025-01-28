package dev.babat.sems.schoolsystem0managementsems.mappers;

import dev.babat.sems.schoolsystem0managementsems.dtos.AcademicYearDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.RoleDto;
import dev.babat.sems.schoolsystem0managementsems.entities.AcademicYearEntity;
import dev.babat.sems.schoolsystem0managementsems.entities.RoleEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AcademicYearMapper {
    AcademicYearDto toDto(AcademicYearEntity academicYearEntity);
    AcademicYearEntity toEntity(AcademicYearDto academicYearDto);
    List<AcademicYearDto> toDtoList(List<AcademicYearEntity> academicYearEntities);
    List<AcademicYearEntity> toEntityList(List<AcademicYearDto> academicYearDtos);
}
