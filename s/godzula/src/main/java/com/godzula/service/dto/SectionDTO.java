package com.godzula.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

import com.godzula.domain.Task;
import com.godzula.domain.enumeration.SectionStatus;
import com.godzula.domain.enumeration.MachineType;

/**
 * A DTO for the Section entity.
 */
public class SectionDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    private String description;

    private SectionStatus status;

    private int order;

    private MachineType targetMachine;

    private Set<Task> tasks;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public SectionStatus getStatus() {
        return status;
    }

    public void setStatus(SectionStatus status) {
        this.status = status;
    }

    public MachineType getTargetMachine() {
        return targetMachine;
    }

    public void setTargetMachine(MachineType targetMachine) {
        this.targetMachine = targetMachine;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public void setKeyInputs(Set<Task> tasks) {
        this.tasks = tasks;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SectionDTO sectionDTO = (SectionDTO) o;
        if (sectionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sectionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SectionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", order='" + getOrder() + "'" +
            ", targetMachine='" + getTargetMachine() + "'" +
            "}";
    }
}
