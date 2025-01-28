package dev.babat.sems.schoolsystem0managementsems.mappers;

import dev.babat.sems.schoolsystem0managementsems.dtos.PaymentDto;
import dev.babat.sems.schoolsystem0managementsems.entities.PaymentEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    PaymentDto toDto(PaymentEntity paymentEntity);
    PaymentEntity toEntity(PaymentDto paymentDto);
    List<PaymentDto> toDtoList(List<PaymentEntity> paymentEntities);
    List<PaymentEntity> toEntityList(List<PaymentDto> paymentDtos);

}
