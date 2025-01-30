package dev.babat.sems.schoolsystem0managementsems.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "subject")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SubjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long subjectId;
    @Column(nullable = false)
    private String subjectName;
    @Column(nullable = false)
    private String subjectDescription;
    private int hours;

    @ManyToMany(mappedBy = "subjects", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<SemesterEntity> semesters = new ArrayList<>();

    @ManyToMany(mappedBy = "subjects", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<UserEntity> users = new ArrayList<>();

}

