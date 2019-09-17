package com.godzula.service;

import com.godzula.domain.CourseMetadata;
import com.godzula.service.dto.CourseDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Course.
 */
public interface CourseService {

    /**
     * Save a course.
     *
     * @param courseDTO the entity to save
     * @return the persisted entity
     */
    CourseDTO save(CourseDTO courseDTO);

    /**
     * Get all the courses.
     *
     * @return the list of entities
     */
    List<CourseDTO> findAll();


    /**
     * Get all courses that are published as metadata
     * Includes properties:
     * Id
     * Name
     * Status
     * TargetMachine
     *
     *
     * @return
     */
    List<CourseMetadata> findAllMetadata();

    /**
     * Get the "id" course.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CourseDTO> findOne(String id);

    /**
     * Delete the "id" course.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
