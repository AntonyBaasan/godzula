package com.godzula.service.mapper;

import com.godzula.domain.*;
import com.godzula.service.dto.SectionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Section and its DTO SectionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SectionMapper extends EntityMapper<SectionDTO, Section> {


    @Mapping(target = "tasks", ignore = true)
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
