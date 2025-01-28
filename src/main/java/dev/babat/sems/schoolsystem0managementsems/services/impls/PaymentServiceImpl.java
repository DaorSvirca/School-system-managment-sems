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
    public PaymentDto findById(Long aLong) {
        return null;
    }

    @Override
    public PaymentDto add(PaymentDto entity) {
        var payments = paymentMapper.toEntity(entity);
        var savedPayments = paymentRepository.save(payments);
        return paymentMapper.toDto(savedPayments);
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public PaymentDto modify(Long aLong, PaymentDto entity) {
        return null;
    }
}
