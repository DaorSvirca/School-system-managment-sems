package dev.babat.sems.schoolsystem0managementsems.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.babat.sems.schoolsystem0managementsems.dtos.LoginDto;
import dev.babat.sems.schoolsystem0managementsems.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final ObjectMapper objectMapper;

    @Autowired
    public AuthController(AuthService authService, ObjectMapper objectMapper) {
        this.authService = authService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        // Authenticate the user
        var user = authService.authenticateUser(loginDto);
        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }

        try {
            // Convert the user object into a JSON string
            String userJson = objectMapper.writeValueAsString(user);

            // Create a cookie to store the user data
            Cookie cookie = new Cookie("user", userJson);
            cookie.setHttpOnly(true); // Prevent client-side access
            cookie.setSecure(false); // Set to true in production for HTTPS
            cookie.setPath("/"); // Cookie will be accessible for the entire domain
            cookie.setMaxAge(60 * 60); // Set expiration to 1 hour

            // Add the cookie to the response
            response.addCookie(cookie);
        } catch (Exception e) {
            // Handle any errors that might occur during serialization
            throw new RuntimeException("Failed to create user cookie", e);
        }

        return ResponseEntity.ok("Login successful");
    }
}
