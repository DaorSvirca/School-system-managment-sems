package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.SemesterDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.SemesterMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.SemesterRepository;
import dev.babat.sems.schoolsystem0managementsems.services.SemesterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SemesterServiceImpl implements SemesterService {
    private final SemesterRepository semesterRepository;
    private final SemesterMapper semesterMapper;
    @Override
    public List<SemesterDto> findAll() {
        var semesters = semesterRepository.findAll();
        return semesterMapper.toDtoList(semesters);
    }

    @Override
    public SemesterDto findById(Long id) {
        var semester = semesterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semester not found"));
        return semesterMapper.toDto(semester);
    }

    @Override
    public SemesterDto add(SemesterDto entity) {
        var semesters = semesterMapper.toEntity(entity);
        var savedSemesters = semesterRepository.save(semesters);
        return semesterMapper.toDto(savedSemesters);
    }

    @Override
    public void deleteById(Long id) {
        if (!semesterRepository.existsById(id)) {
            throw new RuntimeException("Semester not found");
        }
        semesterRepository.deleteById(id);
    }

    @Override
    public SemesterDto modify(Long id, SemesterDto entity) {
        if (!id.equals(entity.getSemesterId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var semesters = semesterMapper.toEntity(entity);
        var updatedSemesters = semesterRepository.save(semesters);
        return semesterMapper.toDto(updatedSemesters);
    }
}
