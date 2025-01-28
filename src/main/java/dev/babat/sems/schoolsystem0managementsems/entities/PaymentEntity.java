package dev.babat.sems.schoolsystem0managementsems.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "payment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long paymentId;
    @ManyToOne(cascade = CascadeType.ALL)
    private UserEntity userId;
}
