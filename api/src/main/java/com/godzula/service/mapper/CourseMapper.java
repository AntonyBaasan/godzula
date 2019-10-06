package com.godzula.service.mapper;

import com.godzula.domain.*;
import com.godzula.service.dto.CourseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Course and its DTO CourseDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {


    @Mapping(target = "sections", ignore = true)
    Course toEntity(CourseDTO courseDTO);

    default Course fromId(String id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
}
