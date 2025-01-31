package dev.babat.sems.schoolsystem0managementsems.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.babat.sems.schoolsystem0managementsems.dtos.LoginDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.UserCookieDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.UserDto;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserEntity> login(@RequestBody LoginDto loginDto, HttpServletResponse response) throws BadRequestException {
        var user = authService.authenticateUser(loginDto);
        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }

        Cookie idCookie = new Cookie("userId", String.valueOf(user.getUserId()));
        Cookie emailCookie = new Cookie("userEmail", user.getEmail());
        Cookie roleIdCookie = new Cookie("roleId", String.valueOf(user.getRoleId().getRoleId()));
        Cookie roleCookie = new Cookie("userRole", user.getRoleId().getRoleName().toString());

        for (Cookie cookie : new Cookie[]{idCookie, emailCookie, roleIdCookie, roleCookie}) {
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60);
            cookie.setAttribute("SameSite", "None");
            response.addCookie(cookie);
        }

        return ResponseEntity.ok(user);
    }
}
