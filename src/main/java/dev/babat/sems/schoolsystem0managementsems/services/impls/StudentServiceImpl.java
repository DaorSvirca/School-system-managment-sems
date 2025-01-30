package dev.babat.sems.schoolsystem0managementsems.services.impls;

import dev.babat.sems.schoolsystem0managementsems.dtos.StudentDto;
import dev.babat.sems.schoolsystem0managementsems.entities.*;
import dev.babat.sems.schoolsystem0managementsems.entities.AcademicYearEntity;
import dev.babat.sems.schoolsystem0managementsems.entities.GroupEntity;
import dev.babat.sems.schoolsystem0managementsems.entities.UserEntity;
import dev.babat.sems.schoolsystem0managementsems.enums.GenderEnum;
import dev.babat.sems.schoolsystem0managementsems.mappers.UserMapper;
import dev.babat.sems.schoolsystem0managementsems.repositories.*;
import dev.babat.sems.schoolsystem0managementsems.services.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final UserRepository repository;
    private final UserMapper mapper;
    private  final AcademicYearRepository academicYearRepository;
    private  final GroupRepository groupRepository;
    private final SemesterRepository semesterRepository;
    private  final RoleRepository roleRepository;
    private  final AddressRepository addressRepository;

    @Override
    public List<StudentDto> findAll() {
        var students = repository.findAll();
        return mapper.toStudentDtoList(students);
    }

    @Override
    public StudentDto findById(Long id) {
        var students = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return mapper.toStudentDto(students);
    }

    @Override
    public StudentDto add(StudentDto entity) {
        var students = mapper.toEntity(entity);
        AcademicYearEntity academicYearEntity = academicYearRepository.findLatestAcademicYear()
                .orElseThrow(() -> new RuntimeException("Academic year not found"));

       log.info("Academic year entity: {}", academicYearEntity);
       students.setAcademicYearId(academicYearEntity);

       var semester = semesterRepository.findById(entity.getSemesterId().getSemesterId())
               .orElseThrow(() -> new RuntimeException("Semester not found"));
       students.setSemesterId(semester);

        GroupEntity groupEntity = groupRepository.findById(entity.getGroupId().getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));
        students.setGroupId(groupEntity);

       students.setAcademicYearId(academicYearEntity);

        RoleEntity role = roleRepository.findById(entity.getRoleId().getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        students.setRoleId(role);

        AddressEntity address = addressRepository.findById(entity.getAddressId().getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        students.setAddressId(address);
        var savedStudents = repository.save(students);
        return mapper.toStudentDto(savedStudents);
    }

    @Override
    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Student not found");
        }
        UserEntity student = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        student.setRoleId(null);
        student.setGroupId(null);
        student.setSemesterId(null);
        student.setAcademicYearId(null);
        repository.save(student);

        repository.deleteById(id);
    }

    @Override
    public StudentDto modify(Long id, StudentDto entity) {
        if (!id.equals(entity.getUserId())) {
            throw new IllegalArgumentException("Id in path and body must be the same");
        }
        var students = mapper.toEntity(entity);
        var updatedStudents = repository.save(students);
        return mapper.toStudentDto(updatedStudents);
    }

    @Override
    public long getUserCountByGender(GenderEnum genderEnum) {
        return repository.countByGender(genderEnum);
    }
}
