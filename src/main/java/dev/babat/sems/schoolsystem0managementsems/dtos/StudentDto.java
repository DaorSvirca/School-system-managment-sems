package dev.babat.sems.schoolsystem0managementsems.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto extends UserDto {
    @PositiveOrZero(message = "Student id must be a positive number")
    @NotNull(message = "Student id is required")
    @NotBlank(message = "Student id is required")
    private GroupDto groupId;
    @PositiveOrZero(message = "Student id must be a positive number")
    @NotNull(message = "Student id is required")
    @NotBlank(message = "Student id is required")
    private SemesterDto semesterId;
    @PositiveOrZero(message = "Student id must be a positive number")
    @NotNull(message = "Student id is required")
    @NotBlank(message = "Student id is required")
    private AcademicYearDto academicYearId;
}
