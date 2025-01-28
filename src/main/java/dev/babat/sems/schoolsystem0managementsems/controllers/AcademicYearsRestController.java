package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.AcademicYearDto;
import dev.babat.sems.schoolsystem0managementsems.services.AcademicYearService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic-years")
public class AcademicYearsRestController {
    private final AcademicYearService academicYearService;

    @Autowired
    public AcademicYearsRestController(AcademicYearService academicYearService) {
        this.academicYearService = academicYearService;
    }

    @GetMapping
    public ResponseEntity<List<AcademicYearDto>> findAll(){
        return ResponseEntity.ok(academicYearService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcademicYearDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(academicYearService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AcademicYearDto> add(@RequestBody AcademicYearDto dto){
        var createdAcademicYear = academicYearService.add(dto);
        return ResponseEntity.status(201).body(createdAcademicYear);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AcademicYearDto> modify(@PathVariable Long id, @RequestBody AcademicYearDto dto){
        return ResponseEntity.ok(academicYearService.modify(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id){
        academicYearService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
