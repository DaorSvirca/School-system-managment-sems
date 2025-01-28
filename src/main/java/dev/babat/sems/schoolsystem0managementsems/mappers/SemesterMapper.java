package dev.babat.sems.schoolsystem0managementsems.mappers;

import dev.babat.sems.schoolsystem0managementsems.dtos.SemesterDto;
import dev.babat.sems.schoolsystem0managementsems.entities.SemesterEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SemesterMapper {
    SemesterDto toDto(SemesterEntity semesterEntity);
    SemesterEntity toEntity(SemesterDto semesterDto);
    List<SemesterDto> toDtoList(List<SemesterEntity> semesterEntities);
    List<SemesterEntity> toEntityList(List<SemesterDto> semesterDtos);
}
