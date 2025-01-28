package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.AddressDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.AddressMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.AddressRepository;
import dev.babat.sems.schoolsystem0managementsems.services.AddressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
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
    public AddressDto findById(Long id) {
        var address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        return addressMapper.toDto(address);
    }

    @Override
    public AddressDto add(AddressDto entity) {
        log.info("Adding address: {}", entity);
        var addresses = addressMapper.toEntity(entity);
        var savedAddresses = addressRepository.save(addresses);
        return addressMapper.toDto(savedAddresses);
    }

    @Override
    public void deleteById(Long id) {
        if (!addressRepository.existsById(id)) {
            throw new RuntimeException("Address not found");
        }
        addressRepository.deleteById(id);

    }

    @Override
    public AddressDto modify(Long id, AddressDto entity) {
        if (!id.equals(entity.getAddressId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var addresses = addressMapper.toEntity(entity);
        var updatedAddresses = addressRepository.save(addresses);
        return addressMapper.toDto(updatedAddresses);
    }
}
