package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.GroupDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.GroupMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.GroupRepository;
import dev.babat.sems.schoolsystem0managementsems.services.GroupService;
import lombok.RequiredArgsConstructor;
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
    public GroupDto findById(Long aLong) {

        return null;
    }

    @Override
    public GroupDto add(GroupDto entity) {
        var groups = groupMapper.toEntity(entity);
        var savedGroups = groupRepository.save(groups);
        return groupMapper.toDto(savedGroups);
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public GroupDto modify(Long aLong, GroupDto entity) {
        return null;
    }
}
