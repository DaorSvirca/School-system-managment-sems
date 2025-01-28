package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.AcademicYearDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.AcademicYearMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.AcademicYearRepository;
import dev.babat.sems.schoolsystem0managementsems.services.AcademicYearService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class AcademicYearServiceImpls implements AcademicYearService {
    private final AcademicYearRepository academicYearRepository;
    private final AcademicYearMapper academicYearMapper;


    @Override
    public List<AcademicYearDto> findAll() {
        var academicYears = academicYearRepository.findAll();
        return academicYearMapper.toDtoList(academicYears);
    }

    @Override
    public AcademicYearDto findById(Long aLong) {
        return null;
    }

    @Override
    public AcademicYearDto add(AcademicYearDto entity) {
        var academicYears = academicYearMapper.toEntity(entity);
        var savedAcademicYears = academicYearRepository.save(academicYears);
        return academicYearMapper.toDto(savedAcademicYears);
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public AcademicYearDto modify(Long aLong, AcademicYearDto entity) {
        return null;
    }
}
