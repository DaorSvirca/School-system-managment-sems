package dev.babat.sems.schoolsystem0managementsems.entities;

import jakarta.persistence.*;

@Entity(name = "academic_year")

public class AcademicYearEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long academicYearId;
    @Column(nullable = false)
    private String academicYear;

    public AcademicYearEntity(Long academicYearId, String academicYear) {
        this.academicYearId = academicYearId;
        this.academicYear = academicYear;
    }

    public AcademicYearEntity() {
    }

    public long getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(Long academicYearId) {
        this.academicYearId = academicYearId;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }
}
