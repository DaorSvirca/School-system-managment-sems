package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.GroupDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.GroupMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.GroupRepository;
import dev.babat.sems.schoolsystem0managementsems.services.GroupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final GroupMapper groupMapper;
    @Override
    public List<GroupDto> findAll() {
        var groups = groupRepository.findAll();
        return groupMapper.toDtoList(groups);
    }

    @Override
    public GroupDto findById(Long id) {
        var product = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        return groupMapper.toDto(product);
    }

    @Override
    public GroupDto add(GroupDto entity) {
        var groups = groupMapper.toEntity(entity);
        var savedGroups = groupRepository.save(groups);
        return groupMapper.toDto(savedGroups);
    }

    @Override
    public void deleteById(Long id) {
        if (!groupRepository.existsById(id)) {
            throw new RuntimeException("Group not found");
        }
        groupRepository.deleteById(id);

    }

    @Override
    public GroupDto modify(Long id, GroupDto entity) {
        if (!id.equals(entity.getGroupId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var groups = groupMapper.toEntity(entity);
        var updatedGroups = groupRepository.save(groups);
        return groupMapper.toDto(updatedGroups);
    }
}
