package com.godzula.repository;

import com.godzula.domain.Course;
import com.godzula.domain.CourseMetadata;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the Course entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseRepositoryCustom  {

    List<CourseMetadata> findSomething();
}
