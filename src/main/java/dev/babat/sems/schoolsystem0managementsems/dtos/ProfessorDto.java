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
public class ProfessorDto extends UserDto {
    @PositiveOrZero(message = "Professor id must be a positive number")
    @NotNull
    @NotBlank
    private AcademicYearDto academicYearId;
}
