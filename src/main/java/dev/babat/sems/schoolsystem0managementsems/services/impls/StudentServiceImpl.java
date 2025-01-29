package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.StudentDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.UserMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.UserRepository;
import dev.babat.sems.schoolsystem0managementsems.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final UserRepository repository;
    private final UserMapper mapper;

    @Override
    public List<StudentDto> findAll() {
        var students = repository.findAll();
        return mapper.toStudentDtoList(students);
    }

    @Override
    public StudentDto findById(Long id) {
        var students = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return mapper.toStudentDto(students);
    }

    @Override
    public StudentDto add(StudentDto entity) {
        var students = mapper.toEntity(entity);
        var savedStudents = repository.save(students);
        return mapper.toStudentDto(savedStudents);
    }

    @Override
    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Student not found");
        }
        repository.deleteById(id);

    }

    @Override
    public StudentDto modify(Long id, StudentDto entity) {
        if (!id.equals(entity.getUserId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var students = mapper.toEntity(entity);
        var updatedStudents = repository.save(students);
        return mapper.toStudentDto(updatedStudents);
    }

}
