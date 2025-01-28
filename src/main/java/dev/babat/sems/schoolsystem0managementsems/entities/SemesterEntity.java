package dev.babat.sems.schoolsystem0managementsems.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "semester")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SemesterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long semesterId;
    @Column(nullable = false)
    private String semesterName;
    @ManyToOne(cascade = CascadeType.ALL)
    private AcademicYearEntity academicYearId;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "semester_subject",
            joinColumns = @JoinColumn(name = "semester_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private List<SubjectEntity> subjects = new ArrayList<>();

}
