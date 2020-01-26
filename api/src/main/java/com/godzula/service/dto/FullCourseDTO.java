package com.godzula.service.dto;

import com.godzula.domain.enumeration.CourseStatus;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the Course entity.
 */
public class FullCourseDTO implements Serializable {

    private CourseDTO course;

    private List<SectionDTO> sections;


    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public List<SectionDTO> getSections() {
        return sections;
    }

    public void setSections(List<SectionDTO> sections) {
        this.sections = sections;
    }
}
