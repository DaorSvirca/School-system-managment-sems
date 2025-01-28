package dev.babat.sems.schoolsystem0managementsems.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDto {
    @PositiveOrZero(message = "Subject id must be a positive number")
    @NotNull(message = "Subject id is required")
    @NotBlank(message = "Subject id is required")
    private long subjectId;
    @NotNull(message = "Subject name is required")
    @NotBlank(message = "Subject name is required")
    private String subjectName;
    @NotNull(message = "Subject description is required")
    @NotBlank(message = "Subject description is required")
    private String subjectDescription;
    @Positive(message = "Subject hours must be a positive number")
    @NotNull(message = "Subject hours is required")
    @NotBlank(message = "Subject hours is required")
    private int hours;
    @NotNull(message = "Subject teacher is required")
    @NotBlank(message = "Subject teacher is required")
    private List<UserDto> users = new ArrayList<>();
    @NotNull(message = "Subject semester is required")
    @NotBlank(message = "Subject semester is required")
    private List<SemesterDto> semesters = new ArrayList<>();

}
