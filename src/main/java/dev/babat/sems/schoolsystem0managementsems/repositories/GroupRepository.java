package dev.babat.sems.schoolsystem0managementsems.repositories;

import dev.babat.sems.schoolsystem0managementsems.entities.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<GroupEntity, Long> {
    boolean existsByGroupName(String groupName);
}
