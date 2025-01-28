package dev.babat.sems.schoolsystem0managementsems.entities;

import dev.babat.sems.schoolsystem0managementsems.enums.RoleNameEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long roleId;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleNameEnum roleName;

}
