package com.godzula.repository;

import com.godzula.domain.Course;
import com.godzula.domain.enumeration.CourseStatus;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the Course entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseRepository extends MongoRepository<Course, String> {

    public List<Course> findAllByStatus(CourseStatus status);
}
