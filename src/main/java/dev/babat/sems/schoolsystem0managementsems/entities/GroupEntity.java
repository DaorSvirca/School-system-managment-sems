package dev.babat.sems.schoolsystem0managementsems.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "groups")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long groupId;
    @Column(nullable = false)
    private String groupName;
    @Column(nullable = false)
        private String orientation;


}
