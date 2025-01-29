package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.AcademicYearDto;
import dev.babat.sems.schoolsystem0managementsems.entities.AcademicYearEntity;
import dev.babat.sems.schoolsystem0managementsems.mappers.AcademicYearMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.AcademicYearRepository;
import dev.babat.sems.schoolsystem0managementsems.services.AcademicYearService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public AcademicYearDto findById(Long id) {
        var academicYear = academicYearRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Academic year not found"));
        return academicYearMapper.toDto(academicYear);
    }

    @Override
    public AcademicYearDto add(AcademicYearDto entity) {
        var academicYears = academicYearMapper.toEntity(entity);
        var savedAcademicYears = academicYearRepository.save(academicYears);
        return academicYearMapper.toDto(savedAcademicYears);
    }

    @Override
    public void deleteById(Long id) {
        if (!academicYearRepository.existsById(id)) {
            throw new RuntimeException("Academic year not found");
        }
        academicYearRepository.deleteById(id);

    }

    @Override
    public AcademicYearDto modify(Long id, AcademicYearDto entity) {
        if (!id.equals(entity.getAcademicYearId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var academicYears = academicYearMapper.toEntity(entity);
        var updatedAcademicYears = academicYearRepository.save(academicYears);
        return academicYearMapper.toDto(updatedAcademicYears);
    }

    @Override
    public Optional<AcademicYearEntity> findByIsAcademicYear() {
        academicYearRepository.findLatestAcademicYear();
        return Optional.empty();
    }
}
