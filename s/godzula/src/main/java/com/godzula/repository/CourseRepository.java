package com.godzula.repository;

import com.godzula.domain.Course;
import com.godzula.domain.CourseMetadata;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the Course entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseRepository extends MongoRepository<Course, String>, CourseRepositoryCustom {

    @Query(value = "{ 'status' : 'PUBLISHED' }", fields = "{ '_id': 1, 'name': 1, 'status': 1, 'target_machine': 1 }")
    List<Course> findAllMetadata();
}
