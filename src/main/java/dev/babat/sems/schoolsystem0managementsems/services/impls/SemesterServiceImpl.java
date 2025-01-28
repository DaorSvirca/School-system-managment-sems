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
    public SemesterDto findById(Long aLong) {
        return null;
    }

    @Override
    public SemesterDto add(SemesterDto entity) {
        var semesters = semesterMapper.toEntity(entity);
        var savedSemesters = semesterRepository.save(semesters);
        return semesterMapper.toDto(savedSemesters);
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public SemesterDto modify(Long aLong, SemesterDto entity) {
        return null;
    }
}
