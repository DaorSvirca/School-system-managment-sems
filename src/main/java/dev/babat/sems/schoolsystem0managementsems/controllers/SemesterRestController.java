package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.SemesterDto;
import dev.babat.sems.schoolsystem0managementsems.services.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/semesters")
public class SemesterRestController {
    private final SemesterService semesterService;

    @Autowired
    public SemesterRestController(SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    @GetMapping
    public ResponseEntity<List<SemesterDto>> findAll(){
        return ResponseEntity.ok(semesterService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SemesterDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(semesterService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SemesterDto> add(@RequestBody SemesterDto dto){
        var createdSemester = semesterService.add(dto);
        return ResponseEntity.status(201).body(createdSemester);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SemesterDto> modify(@PathVariable Long id, @RequestBody SemesterDto dto){
        return ResponseEntity.ok(semesterService.modify(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id){
        semesterService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
