package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.ProfessorDto;
import dev.babat.sems.schoolsystem0managementsems.services.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/professors")
public class ProfessorRestController {
    private final ProfessorService professorService;


    @Autowired
    public ProfessorRestController(ProfessorService professorService) {
        this.professorService = professorService;
    }


    @GetMapping
    public ResponseEntity<List<ProfessorDto>> findAll(){
        return ResponseEntity.ok(professorService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(professorService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProfessorDto> add(@RequestBody ProfessorDto dto){
        var createdProfessor = professorService.add(dto);
        return ResponseEntity.status(201).body(createdProfessor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDto> modify(@PathVariable Long id,@RequestBody ProfessorDto dto){
        return ResponseEntity.ok(professorService.modify(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id){
        professorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
