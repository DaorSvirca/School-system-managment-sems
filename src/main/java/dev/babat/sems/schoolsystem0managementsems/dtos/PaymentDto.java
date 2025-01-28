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
public class PaymentDto {
    @PositiveOrZero(message = "Payment id must be a positive number")
    @NotNull(message = "Payment id is required")
    @NotBlank(message = "Payment id is required")
    private long paymentId;
    @NotNull(message = "Payment amount is required")
    @NotBlank(message = "Payment amount is required")
    private UserDto userId;
}
