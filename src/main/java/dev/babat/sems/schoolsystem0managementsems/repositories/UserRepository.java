package dev.babat.sems.schoolsystem0managementsems.repositories;

import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.enums.GenderEnum;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    @Override
    @EntityGraph(attributePaths = {"addressId", "roleId", "groupId", "semesterId", "academicYearId"})
    Optional<UserEntity> findById(Long id);
<<<<<<< Updated upstream
=======


    long countByGender(GenderEnum genderEnum);


>>>>>>> Stashed changes
}
