package dev.babat.sems.schoolsystem0managementsems.services;

import dev.babat.sems.schoolsystem0managementsems.dtos.AcademicYearDto;
import dev.babat.sems.schoolsystem0managementsems.entities.AcademicYearEntity;

import java.util.Optional;

public interface AcademicYearService extends BaseService<AcademicYearDto, Long> {
    Optional<AcademicYearEntity> findByIsAcademicYear();
}
