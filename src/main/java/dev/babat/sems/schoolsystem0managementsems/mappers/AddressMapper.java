package dev.babat.sems.schoolsystem0managementsems.mappers;

import dev.babat.sems.schoolsystem0managementsems.dtos.AddressDto;
import dev.babat.sems.schoolsystem0managementsems.entities.AddressEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AddressMapper{
    AddressDto toDto(AddressEntity addressEntity);
    AddressEntity toEntity(AddressDto addressDto);
    List<AddressDto> toDtoList(List<AddressEntity> addressEntities);
    List<AddressEntity> toEntityList(List<AddressDto> addressDtos);
}
