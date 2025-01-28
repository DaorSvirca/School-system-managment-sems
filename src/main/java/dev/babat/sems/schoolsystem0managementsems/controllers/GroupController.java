package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.GroupDto;
import dev.babat.sems.schoolsystem0managementsems.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/groups")
public class GroupController {
    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    public ResponseEntity<List<GroupDto>> findAll() {
        return ResponseEntity.ok(groupService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(groupService.findById(id));
    }


    @PostMapping
    public ResponseEntity<GroupDto> add(@RequestBody GroupDto dto) {
        var createdGroup = groupService.add(dto);
        return ResponseEntity.status(201).body(createdGroup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroupDto> modify(@PathVariable Long id, @RequestBody GroupDto dto) {
        return ResponseEntity.ok(groupService.modify(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id) {
        groupService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
