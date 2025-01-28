package dev.babat.sems.schoolsystem0managementsems.controllers;

import dev.babat.sems.schoolsystem0managementsems.dtos.PaymentDto;
import dev.babat.sems.schoolsystem0managementsems.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentRestController {

    private final PaymentService paymentService;


    @Autowired
    public PaymentRestController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentDto>> findAll(){
        return ResponseEntity.ok(paymentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(paymentService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PaymentDto> add(@RequestBody PaymentDto dto){
        var createdPayment = paymentService.add(dto);
        return ResponseEntity.status(201).body(createdPayment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentDto> modify(@PathVariable Long id, @RequestBody PaymentDto dto){
        return ResponseEntity.ok(paymentService.modify(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeById(@PathVariable Long id){
        paymentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }




}
