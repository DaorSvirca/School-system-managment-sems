package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.SemesterDto;
import dev.babat.sems.schoolsystem0managementsems.entities.SemesterEntity;
import dev.babat.sems.schoolsystem0managementsems.entities.SubjectEntity;
import dev.babat.sems.schoolsystem0managementsems.mappers.SemesterMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.SemesterRepository;
import dev.babat.sems.schoolsystem0managementsems.repositories.SubjectRepository;
import dev.babat.sems.schoolsystem0managementsems.services.SemesterService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SemesterServiceImpl implements SemesterService {
    private final SemesterRepository semesterRepository;
    private final SemesterMapper semesterMapper;
    private  final SubjectRepository subjectRepository;
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

    @Override
    public SemesterDto addSubject(Long semesterId, Long subjectId) {
        SemesterEntity semester = semesterRepository.findById(semesterId)
                .orElseThrow(() -> new EntityNotFoundException("Semester not found with ID: " + semesterId));

        SubjectEntity subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found with ID: " + subjectId));

        if (!semester.getSubjects().contains(subject)) {
            semester.getSubjects().add(subject);
        }

        if (!subject.getSemesters().contains(semester)) {
            subject.getSemesters().add(semester);
        }

        semesterRepository.save(semester);
        subjectRepository.save(subject);

        return semesterMapper.toDto(semester);
    }

    @Override
    public SemesterDto removeSubject(Long semesterId, Long subjectId) {
        SemesterEntity semester = semesterRepository.findById(semesterId)
                .orElseThrow(() -> new EntityNotFoundException("Semester not found with ID: " + semesterId));

        SubjectEntity subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found with ID: " + subjectId));

        if (semester.getSubjects().contains(subject)) {
            semester.getSubjects().remove(subject);
        }

        if (subject.getSemesters().contains(semester)) {
            subject.getSemesters().remove(semester);
        }

        semesterRepository.save(semester);
        subjectRepository.save(subject);

        return semesterMapper.toDto(semester);
    }


}
