package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.PaymentDto;
import dev.babat.sems.schoolsystem0managementsems.mappers.PaymentMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.PaymentRepository;
import dev.babat.sems.schoolsystem0managementsems.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    @Override
    public List<PaymentDto> findAll() {
        var payments = paymentRepository.findAll();
        return paymentMapper.toDtoList(payments);
    }

    @Override
    public PaymentDto findById(Long id) {
        var payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return paymentMapper.toDto(payment);
    }

    @Override
    public PaymentDto add(PaymentDto entity) {
        var payments = paymentMapper.toEntity(entity);
        var savedPayments = paymentRepository.save(payments);
        return paymentMapper.toDto(savedPayments);
    }

    @Override
    public void deleteById(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new RuntimeException("Payment not found");
        }
        paymentRepository.deleteById(id);
    }

    @Override
    public PaymentDto modify(Long id, PaymentDto entity) {
        if (!id.equals(entity.getPaymentId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var payments = paymentMapper.toEntity(entity);
        var updatedPayments = paymentRepository.save(payments);
        return paymentMapper.toDto(updatedPayments);
    }
}
