package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.AddressDto;
import dev.babat.sems.schoolsystem0managementsems.services.AddressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/addresses")
public class AddressRestController {
    private final AddressService addressService;

    @Autowired
    public AddressRestController(AddressService addressService) {
        this.addressService = addressService;
    }


    @GetMapping
    public ResponseEntity<List<AddressDto>> findAll() {
        return ResponseEntity.ok(addressService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(addressService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AddressDto> add(@Valid @RequestBody AddressDto dto) {
        var createdAddress = addressService.add(dto);
        return ResponseEntity.status(201).body(createdAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressDto> modify(@PathVariable Long id, @RequestBody AddressDto dto) {
        return ResponseEntity.ok(addressService.modify(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id) {
        addressService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

