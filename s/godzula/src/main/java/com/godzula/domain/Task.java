package com.godzula.domain;

import com.godzula.domain.enumeration.TaskType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.godzula.domain.enumeration.MachineType;

/**
 * A Task.
 */
@Document(collection = "task")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("question")
    private String question;

    @Field("description")
    private String description;

    @Field("answer")
    private String answer;

    @Field("type")
    private TaskType type;

    @Field("target_machine")
    private MachineType targetMachine;

    @DBRef
    @Field("section")
    private Section section;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public Task question(String question) {
        this.question = question;
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getDescription() {
        return description;
    }

    public Task description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAnswer() {
        return answer;
    }

    public Task answer(String answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public TaskType getType() {
        return type;
    }

    public Task type(TaskType type) {
        this.type = type;
        return this;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public MachineType getTargetMachine() {
        return targetMachine;
    }

    public Task targetMachine(MachineType targetMachine) {
        this.targetMachine = targetMachine;
        return this;
    }

    public void setTargetMachine(MachineType targetMachine) {
        this.targetMachine = targetMachine;
    }

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public Task section(Section section) {
        this.section = section;
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
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", question='" + getQuestion() + "'" +
            ", description='" + getDescription() + "'" +
            ", answer='" + getAnswer() + "'" +
            ", type='" + getType() + "'" +
            ", targetMachine='" + getTargetMachine() + "'" +
            "}";
    }
}
