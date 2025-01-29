package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.ProfessorDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.UserMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.UserRepository;
import dev.babat.sems.schoolsystem0managementsems.services.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {
    private final UserRepository repository;
    private final UserMapper mapper;

    @Override
    public List<ProfessorDto> findAll() {
        var professors = repository.findAll();
        return mapper.toProfessorDtoList(professors);
    }

    @Override
    public ProfessorDto findById(Long id) {
        var professors = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor not found"));
        return mapper.toProfessorDto(professors);
    }

    @Override
    public ProfessorDto add(ProfessorDto entity) {
        var professors = mapper.toEntity(entity);
        var savedProfessors = repository.save(professors);
        return mapper.toProfessorDto(savedProfessors);
    }

    @Override
    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Professor not found");
        }
        repository.deleteById(id);
    }

    @Override
    public ProfessorDto modify(Long id, ProfessorDto entity) {
        if (!id.equals(entity.getUserId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var professors = mapper.toEntity(entity);
        var updatedProfessors = repository.save(professors);
        return mapper.toProfessorDto(updatedProfessors);
    }
}
