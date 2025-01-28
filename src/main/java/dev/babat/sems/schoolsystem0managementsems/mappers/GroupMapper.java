package dev.babat.sems.schoolsystem0managementsems.mappers;

import dev.babat.sems.schoolsystem0managementsems.dtos.GroupDto;
import dev.babat.sems.schoolsystem0managementsems.entities.GroupEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupMapper {
     GroupDto toDto(GroupEntity groupEntity);
     GroupEntity toEntity(GroupDto groupDto);
     List<GroupDto> toDtoList(List<GroupEntity> groupEntities);
     List<GroupEntity> toEntityList(List<GroupDto> groupDtos);

}
