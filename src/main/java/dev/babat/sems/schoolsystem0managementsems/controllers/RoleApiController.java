package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.RoleDto;
import dev.babat.sems.schoolsystem0managementsems.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleApiController {
    private final RoleService roleService;

    @Autowired
    public RoleApiController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<RoleDto>> findAll(){
        return ResponseEntity.ok(roleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(roleService.findById(id));
    }

    @PostMapping
    public ResponseEntity<RoleDto> add(@RequestBody RoleDto dto){
        var createdRoles = roleService.add(dto);
        return ResponseEntity.status(201).body(createdRoles);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleDto> modify(@PathVariable Long id, @RequestBody RoleDto dto){
        return ResponseEntity.ok(roleService.modify(id, dto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id){
        roleService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
