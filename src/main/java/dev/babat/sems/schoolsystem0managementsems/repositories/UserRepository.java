package dev.babat.sems.schoolsystem0managementsems.repositories;

import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    @Override
    @EntityGraph(attributePaths = {"roleId", "addressId"})
    Optional<UserEntity> findById(Long id);


}
