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
public class GroupDto {
    @PositiveOrZero(message = "Group id must be a positive number")
    @NotNull(message = "Group id is required")
    @NotBlank(message = "Group id is required")
    private long groupId;
    @NotNull(message = "Group name is required")
    @NotBlank(message = "Group name is required")
    private String groupName;

    private List<UserDto> users = new ArrayList<>();

}
