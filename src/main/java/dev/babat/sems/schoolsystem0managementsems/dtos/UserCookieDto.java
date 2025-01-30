package dev.babat.sems.schoolsystem0managementsems.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.io.Serializable;

@Data
@AllArgsConstructor
public class UserCookieDto implements Serializable {
    private Long id;
    private String email;
    private long roleId;
    private String role;
}
