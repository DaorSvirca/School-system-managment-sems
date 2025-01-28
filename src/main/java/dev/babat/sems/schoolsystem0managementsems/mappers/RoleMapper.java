package dev.babat.sems.schoolsystem0managementsems.mappers;

import dev.babat.sems.schoolsystem0managementsems.dtos.RoleDto;
import dev.babat.sems.schoolsystem0managementsems.entities.RoleEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
RoleDto toDto(RoleEntity roleEntity);
RoleEntity toEntity(RoleDto roleDto);
List<RoleDto> toDtoList(List<RoleEntity> roleEntities);
List<RoleEntity> toEntityList(List<RoleDto> roleDtos);

}
