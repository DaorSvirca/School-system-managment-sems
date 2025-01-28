package dev.babat.sems.schoolsystem0managementsems.repositories;

import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);
}
