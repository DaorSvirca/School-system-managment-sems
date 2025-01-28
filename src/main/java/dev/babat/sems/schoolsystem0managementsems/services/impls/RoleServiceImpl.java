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
    public RoleDto findById(Long id) {
        var role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return roleMapper.toDto(role);
    }

    @Override
    public RoleDto add(RoleDto entity) {
        var roles = roleMapper.toEntity(entity);
        var savedRoles = roleRepository.save(roles);
        return roleMapper.toDto(savedRoles);
    }

    @Override
    public void deleteById(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new RuntimeException("Role not found");
        }
        roleRepository.deleteById(id);
    }

    @Override
    public RoleDto modify(Long id, RoleDto entity) {
        if (!id.equals(entity.getRoleId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var roles = roleMapper.toEntity(entity);
        var updatedRoles = roleRepository.save(roles);
        return roleMapper.toDto(updatedRoles);
    }
}
