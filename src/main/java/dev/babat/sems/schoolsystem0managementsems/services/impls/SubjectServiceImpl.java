package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.SubjectDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.SubjectMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.SubjectRepository;
import dev.babat.sems.schoolsystem0managementsems.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepository subjectRepository;
    private final SubjectMapper subjectMapper;
    @Override
    public List<SubjectDto> findAll() {
        var subjects = subjectRepository.findAll();
        return subjectMapper.toDtoList(subjects);
    }

    @Override
    public SubjectDto findById(Long aLong) {
        return null;
    }

    @Override
    public SubjectDto add(SubjectDto entity) {
        var subjects = subjectMapper.toEntity(entity);
        var savedSubjects = subjectRepository.save(subjects);
        return subjectMapper.toDto(savedSubjects);
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public SubjectDto modify(Long aLong, SubjectDto entity) {
        return null;
    }
}
