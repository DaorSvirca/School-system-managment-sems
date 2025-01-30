package dev.babat.sems.schoolsystem0managementsems.services;

import dev.babat.sems.schoolsystem0managementsems.dtos.SemesterDto;

public interface SemesterService extends BaseService<SemesterDto, Long> {
    SemesterDto addSubject(Long semesterId, Long subjectId);
    SemesterDto removeSubject(Long semesterId, Long subjectId);
}
