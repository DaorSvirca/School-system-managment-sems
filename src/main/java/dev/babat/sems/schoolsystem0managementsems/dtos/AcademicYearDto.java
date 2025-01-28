package dev.babat.sems.schoolsystem0managementsems.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcademicYearDto {
    @PositiveOrZero(message = "Academic year id must be a positive number")
    @NotNull(message = "Academic year id is required")
    private Long academicYearId;
    @NotNull(message = "Academic year is required")
    @NotBlank(message = "Academic year is required")
    private String academicYear;
}
