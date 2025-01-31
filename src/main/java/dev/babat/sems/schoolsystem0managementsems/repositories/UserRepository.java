package dev.babat.sems.schoolsystem0managementsems.repositories;

import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.enums.GenderEnum;
import dev.babat.sems.schoolsystem0managementsems.enums.RoleNameEnum;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    @Override
    @EntityGraph(attributePaths = {"addressId", "roleId", "groupId", "semesterId", "academicYearId", "subjectId"})
    Optional<UserEntity> findById(Long id);



    long countByGender(GenderEnum genderEnum);

    @Query("SELECT u FROM users u WHERE u.roleId.roleName = :roleName")
    List<UserEntity> findByRoleName(@Param("roleName") RoleNameEnum roleName);



}
