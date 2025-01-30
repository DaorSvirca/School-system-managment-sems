package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.StudentDto;
import dev.babat.sems.schoolsystem0managementsems.services.StudentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
public class StudentRestController {

    private final StudentService studentService;


    @Autowired
    public StudentRestController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<StudentDto>> findAll(){
        return ResponseEntity.ok(studentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(studentService.findById(id));
    }

    @PostMapping
    public ResponseEntity<StudentDto> add(@RequestBody StudentDto dto , HttpServletRequest request){
        var createdStudent = studentService.add(dto);
        return ResponseEntity.status(201).body(createdStudent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDto> modify(@PathVariable Long id,@RequestBody StudentDto dto){
        return ResponseEntity.ok(studentService.modify(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id){
        studentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
