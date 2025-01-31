package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.SubjectDto;
import dev.babat.sems.schoolsystem0managementsems.entities.SemesterEntity;
import dev.babat.sems.schoolsystem0managementsems.entities.SubjectEntity;
import dev.babat.sems.schoolsystem0managementsems.mappers.SubjectMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.SemesterRepository;
import dev.babat.sems.schoolsystem0managementsems.repositories.SubjectRepository;
import dev.babat.sems.schoolsystem0managementsems.services.SubjectService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepository subjectRepository;
    private final SubjectMapper subjectMapper;
    private final SemesterRepository semesterRepository;
    @Override
    public List<SubjectDto> findAll() {
        var subjects = subjectRepository.findAll();
        return subjectMapper.toDtoList(subjects);
    }

    @Override
    public SubjectDto findById(Long id) {
        var subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        return subjectMapper.toDto(subject);
    }

    @Override
    public SubjectDto add(SubjectDto entity) {

        if (subjectRepository.existsBySubjectName(entity.getSubjectName())) {
            throw new RuntimeException("Subject with name '" + entity.getSubjectName() + "' already exists.");
        }

        var subjects = subjectMapper.toEntity(entity);

        List<SemesterEntity> semesters = subjects.getSemesters().stream()
                .map(semesterDto -> semesterRepository.findById(semesterDto.getSemesterId())
                        .orElseThrow(() -> new EntityNotFoundException("Semester not found with ID: " + semesterDto.getSemesterId())))
                .collect(Collectors.toList());

        subjects.setSemesters(semesters);

        for (SemesterEntity semester : semesters) {
            semester.getSubjects().add(subjects);
        }
        var savedSubjects = subjectRepository.save(subjects);
        return subjectMapper.toDto(savedSubjects);
    }

    @Override
    public void deleteById(Long id) {
        SubjectEntity subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));


        for (SemesterEntity semester : subject.getSemesters()) {
            if (semester.getSubjects() != null) {
                semester.getSubjects().remove(subject);
                semesterRepository.save(semester);
            }
            }
        semesterRepository.saveAll(subject.getSemesters());

        subjectRepository.delete(subject);
    }
    @Override
    public SubjectDto modify(Long id, SubjectDto entity) {
        if (!id.equals(entity.getSubjectId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var subjects = subjectMapper.toEntity(entity);
        var updatedSubjects = subjectRepository.save(subjects);
        return subjectMapper.toDto(updatedSubjects);
    }



}
