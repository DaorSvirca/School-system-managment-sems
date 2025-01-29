package dev.babat.sems.schoolsystem0managementsems.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SemesterDto {
    @PositiveOrZero(message = "Semester id must be a positive number")
    @NotNull(message = "Semester id is required")
    @NotBlank(message = "Semester id is required")
    private long semesterId;
    @NotNull(message = "Semester name is required")
    @NotBlank(message = "Semester name is required")
    private String semesterName;
    @NotNull(message = "Group description is required")
    @NotBlank(message = "Group description is required")
    private String orientation;
    @NotNull(message = "Semester subjects are required")
    @NotBlank(message = "Semester subjects are required")
    private List<SubjectDto> subjects = new ArrayList<>();

}
