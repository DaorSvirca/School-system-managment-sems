package dev.babat.sems.schoolsystem0managementsems.entities;

import dev.babat.sems.schoolsystem0managementsems.enums.GenderEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

    @Entity(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String phoneNumber;
    @Column(nullable = false)
    private LocalDate birthDate;
    @Column(nullable = false )
    @Enumerated(EnumType.STRING)
    private GenderEnum gender;
    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private AddressEntity addressId;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "group_id")
    private GroupEntity groupId;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "academic_year_id")
    private AcademicYearEntity academicYearId;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id")
    private RoleEntity roleId;
    @Column(nullable = false)
    private boolean isActive = true;
    @Column(nullable = false)
    private Date createdAt;
    @Column(nullable = false)
    private Date updatedAt;


    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "user_subject",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private List<SubjectEntity> subjects = new ArrayList<>();



}
