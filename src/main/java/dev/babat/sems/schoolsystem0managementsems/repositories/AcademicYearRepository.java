package dev.babat.sems.schoolsystem0managementsems.repositories;

import dev.babat.sems.schoolsystem0managementsems.entities.AcademicYearEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AcademicYearRepository extends JpaRepository<AcademicYearEntity, Long> {

    @Query("SELECT a FROM academic_year a ORDER BY a.academicYearId DESC LIMIT 1")
    Optional<AcademicYearEntity> findLatestAcademicYear();
}
