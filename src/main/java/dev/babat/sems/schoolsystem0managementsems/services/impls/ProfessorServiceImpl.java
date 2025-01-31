package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.ProfessorDto;
import dev.babat.sems.schoolsystem0managementsems.dtos.SubjectDto;
import dev.babat.sems.schoolsystem0managementsems.entities.SubjectEntity;
import dev.babat.sems.schoolsystem0managementsems.mappers.UserMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.SubjectRepository;
import dev.babat.sems.schoolsystem0managementsems.repositories.UserRepository;
import dev.babat.sems.schoolsystem0managementsems.services.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {
    private final UserRepository repository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final SubjectRepository subjectRepository;

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
        var professor = mapper.toEntity(entity);

        professor.setPassword(passwordEncoder.encode(entity.getPassword()));
        List<Long> subjectIds = entity.getSubjects().stream()
                .map(SubjectDto::getSubjectId)
                .collect(Collectors.toList());

        List<SubjectEntity> subjects = subjectRepository.findAllById(subjectIds);

        professor.setSubjects(subjects);

        var savedProfessors = repository.save(professor);
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
