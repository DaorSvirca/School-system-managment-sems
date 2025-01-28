package dev.babat.sems.schoolsystem0managementsems.mappers;

import dev.babat.sems.schoolsystem0managementsems.dtos.SubjectDto;
import dev.babat.sems.schoolsystem0managementsems.entities.SubjectEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubjectMapper {
    SubjectDto toDto(SubjectEntity subjectEntity);
    SubjectEntity toEntity(SubjectDto subjectDto);
    List<SubjectDto> toDtoList(List<SubjectEntity> subjectEntities);
    List<SubjectEntity> toEntityList(List<SubjectDto> subjectDtos);

}
