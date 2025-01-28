package dev.babat.sems.schoolsystem0managementsems.mappers;

import java.util.List;

public interface SimpleMapper<TEntity, TDto> {
    TEntity toEntity(TDto dto);

    TDto toDto(TEntity entity);

    List<TEntity> toEntityList(List<TDto> dtoList);

    List<TDto> toDtoList(List<TEntity> entityList);
}