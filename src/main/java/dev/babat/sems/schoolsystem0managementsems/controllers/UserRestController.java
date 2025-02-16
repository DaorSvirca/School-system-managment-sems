package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.UserDto;
import dev.babat.sems.schoolsystem0managementsems.enums.RoleNameEnum;
import dev.babat.sems.schoolsystem0managementsems.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
public class UserRestController {
    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UserDto> add(@RequestBody UserDto dto) {
        log.info("Adding new user", dto);
        var createdUser = userService.add(dto);
        return ResponseEntity.status(201).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> modify(@PathVariable Long id, @RequestBody UserDto dto) {
        return ResponseEntity.ok(userService.modify(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserDto>> getUserByRole(@PathVariable RoleNameEnum role){
        return ResponseEntity.ok(userService.findByRoleId(role));
    }

}
