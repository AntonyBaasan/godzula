package com.godzula.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.godzula.domain.Section;
import com.godzula.domain.enumeration.CourseStatus;
import com.godzula.domain.enumeration.MachineType;

/**
 * A DTO for the Course entity.
 */
@JsonInclude(JsonInclude.Include.NON_NULL) // this excludes null properties from json object presentation
public class CourseDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    private String description;

    private String imageUrl;

    private CourseStatus status;

    private MachineType targetMachine;

    private Set<Section> sections;

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public CourseStatus getStatus() {
        return status;
    }

    public void setStatus(CourseStatus status) {
        this.status = status;
    }

    public MachineType getTargetMachine() {
        return targetMachine;
    }

    public void setTargetMachine(MachineType targetMachine) {
        this.targetMachine = targetMachine;
    }

    public void setSections(Set<Section> sections) {
        this.sections = sections;
    }

    public Set<Section> getSections() {
        return sections;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CourseDTO courseDTO = (CourseDTO) o;
        if (courseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", status='" + getStatus() + "'" +
            ", targetMachine='" + getTargetMachine() + "'" +
            "}";
    }

}
