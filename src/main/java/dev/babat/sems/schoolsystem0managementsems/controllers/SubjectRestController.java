package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.SubjectDto;
import dev.babat.sems.schoolsystem0managementsems.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subjects")
public class SubjectRestController {
    private final SubjectService subjectService;

    @Autowired
    public SubjectRestController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public ResponseEntity<List<SubjectDto>> findAll(){
        return ResponseEntity.ok(subjectService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(subjectService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SubjectDto> add(@RequestBody SubjectDto dto){
        var createdSubject = subjectService.add(dto);
        return ResponseEntity.status(201).body(createdSubject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectDto> modify(@PathVariable Long id, @RequestBody SubjectDto dto){
        return ResponseEntity.ok(subjectService.modify(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id){
        subjectService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
