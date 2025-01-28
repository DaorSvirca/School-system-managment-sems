package dev.babat.sems.schoolsystem0managementsems.dtos;

import dev.babat.sems.schoolsystem0managementsems.enums.GenderEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.Date;

public class CreateUserDto {
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
    @NotBlank(message = "Birth date is required")
    private String birthDate;
    @NotNull
    private GenderEnum gender;
    @NotNull(message = "Address is required")
    private AddressDto address;
    @NotNull(message = "Role is required")
    private RoleDto role;
    @NotNull(message = "Active status is required")
    private boolean isActive = true;
    @NotNull(message = "Date is required")
    private Date createdAt = new Date();
    @NotNull(message = "Date is required")
    private Date updatedAt = new Date();

}
