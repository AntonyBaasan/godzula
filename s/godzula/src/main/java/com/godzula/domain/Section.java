package com.godzula.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.godzula.domain.enumeration.SectionStatus;

import com.godzula.domain.enumeration.MachineType;

/**
 * A Section.
 */
@Document(collection = "section")
public class Section implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @Field("status")
    private SectionStatus status;

    @Field("order")
    private int order;

    @Field("target_machine")
    private MachineType targetMachine;

    @DBRef
    @Field("section")
    private Course course;

    @Field("task")
    private Set<Task> tasks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Section name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Section description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SectionStatus getStatus() {
        return status;
    }

    public Section status(SectionStatus status) {
        this.status = status;
        return this;
    }

    public int getOrder() {
        return order;
    }

    public Section status(int order) {
        this.order = order;
        return this;
    }

    public void setStatus(SectionStatus status) {
        this.status = status;
    }

    public MachineType getTargetMachine() {
        return targetMachine;
    }

    public Section targetMachine(MachineType targetMachine) {
        this.targetMachine = targetMachine;
        return this;
    }

    public void setTargetMachine(MachineType targetMachine) {
        this.targetMachine = targetMachine;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Section tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Section addTask(Task task) {
        this.tasks.add(task);
        return this;
    }

    public Section removeTask(Task task) {
        this.tasks.remove(task);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Section course(Course course) {
        this.course = course;
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Section section = (Section) o;
        if (section.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), section.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Section{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", targetMachine='" + getTargetMachine() + "'" +
            "}";
    }
}
