package dev.babat.sems.schoolsystem0managementsems.repositories;

import dev.babat.sems.schoolsystem0managementsems.entities.SemesterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterRepository extends JpaRepository<SemesterEntity, Long> {
}
