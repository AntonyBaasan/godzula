package com.godzula.service.mapper;

import com.godzula.domain.*;
import com.godzula.service.dto.SectionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Section and its DTO SectionDTO.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class})
public interface SectionMapper extends EntityMapper<SectionDTO, Section> {

    @Mapping(source = "course.id", target = "courseId")
    SectionDTO toDto(Section section);

    @Mapping(target = "tasks", ignore = true)
    @Mapping(source = "courseId", target = "course")
    Section toEntity(SectionDTO sectionDTO);

    default Section fromId(String id) {
        if (id == null) {
            return null;
        }
        Section section = new Section();
        section.setId(id);
        return section;
    }
}
