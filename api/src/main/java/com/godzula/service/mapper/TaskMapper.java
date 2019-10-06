package com.godzula.service.mapper;

import com.godzula.domain.*;
import com.godzula.service.dto.TaskDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Task and its DTO TaskDTO.
 */
@Mapper(componentModel = "spring", uses = {SectionMapper.class})
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {

    @Mapping(source = "section.id", target = "sectionId")
    TaskDTO toDto(Task task);

    @Mapping(source = "sectionId", target = "section")
    Task toEntity(TaskDTO taskDTO);

    default Task fromId(String id) {
        if (id == null) {
            return null;
        }
        Task task = new Task();
        task.setId(id);
        return task;
    }
}
