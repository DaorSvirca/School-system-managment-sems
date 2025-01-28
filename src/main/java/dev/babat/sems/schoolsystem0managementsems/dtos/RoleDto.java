package dev.babat.sems.schoolsystem0managementsems.dtos;

import dev.babat.sems.schoolsystem0managementsems.enums.RoleNameEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    @PositiveOrZero(message = "Role id must be a positive number")
    @NotNull(message = "Role id is required")
    @NotBlank(message = "Role id is required")
    private long roleId;
    @NotNull(message = "Role name is required")
    @NotBlank(message = "Role name is required")
    private RoleNameEnum roleName;

}
