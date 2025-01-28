package dev.babat.sems.schoolsystem0managementsems.services;

import java.util.List;

public interface BaseService<T, ID> {
    List<T> findAll();

    T findById(ID id);

    T add(T entity);

    void deleteById(ID id);

    T modify(ID id, T entity);
}
