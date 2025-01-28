package dev.babat.sems.schoolsystem0managementsems.dtos;


import dev.babat.sems.schoolsystem0managementsems.enums.GenderEnum;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @PositiveOrZero(message = "User id must be a positive number")
    private long userId;
    @NotBlank(message = "First name is required")
    private String firstName;
    @NotBlank(message = "Last name is required")
    private String lastName;
    @Email(message = "Email must be a valid")
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Password is required")
    private String password;
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;
    @Enumerated(jakarta.persistence.EnumType.STRING)
    private GenderEnum gender;
    @NotNull(message = "Address is required")
    private AddressDto address;
    @NotNull(message = "Role is required")
    private RoleDto role;
    @NotNull(message = "Active status is required")
    private boolean isActive;
    @NotNull(message = "Date is required")
    private Date createdAt = new Date();
    @NotNull(message = "Date is required")
    private Date updatedAt = new Date();

}
