package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.RoleDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.RoleMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.RoleRepository;
import dev.babat.sems.schoolsystem0managementsems.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    public List<RoleDto> findAll() {
        var roles = roleRepository.findAll();
         return roleMapper.toDtoList(roles);
    }

    @Override
    public RoleDto findById(Long aLong) {
        return null;
    }

    @Override
    public RoleDto add(RoleDto entity) {
        var roles = roleMapper.toEntity(entity);
        var savedRoles = roleRepository.save(roles);
        return roleMapper.toDto(savedRoles);
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public RoleDto modify(Long aLong, RoleDto entity) {
        return null;
    }
}
