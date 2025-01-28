package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.AddressDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.AddressMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.AddressRepository;
import dev.babat.sems.schoolsystem0managementsems.services.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;

    @Override
    public List<AddressDto> findAll() {
        var addresses = addressRepository.findAll();
        return addressMapper.toDtoList(addresses);
    }

    @Override
    public AddressDto findById(Long aLong) {
        return null;
    }

    @Override
    public AddressDto add(AddressDto entity) {
        var addresses = addressMapper.toEntity(entity);
        var savedAddresses = addressRepository.save(addresses);
        return addressMapper.toDto(savedAddresses);
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public AddressDto modify(Long aLong, AddressDto entity) {
        return null;
    }
}
