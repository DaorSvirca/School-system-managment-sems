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
public class ProfessorDto extends UserDto {
    @NotNull(message = "Semester subjects are required")
    @NotBlank(message = "Semester subjects are required")
    private List<SubjectDto> subjects = new ArrayList<>();
}
