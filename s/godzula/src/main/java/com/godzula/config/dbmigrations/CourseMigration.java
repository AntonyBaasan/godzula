package com.godzula.config.dbmigrations;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import com.godzula.domain.*;
import com.godzula.domain.enumeration.CourseStatus;
import com.godzula.domain.enumeration.SectionStatus;
import org.springframework.data.mongodb.core.MongoTemplate;

/**
 * Creates the initial database setup
 */
@ChangeLog(order = "002")
public class CourseMigration {

    @ChangeSet(order = "01", author = "initiator", id = "01-addCourse")
    public void addCourse(MongoTemplate mongoTemplate) {

        Task task = new Task();
        task.setId("1");
        task.setQuestion("Copy");
        task.setAnswer("Ctrl+C");
        Section section1 = new Section();
        section1.setId("1");
        section1.setName("Basic Excel");
        section1.setDescription("Desc1");
        section1.setStatus(SectionStatus.PUBLISHED);
        section1.addTask(task);
        task.setSection(section1);
        mongoTemplate.save(task);
        mongoTemplate.save(section1);

        Task task2 = new Task();
        task2.setId("2");
        task2.setQuestion("Copy");
        task2.setAnswer("Ctrl+C");
        Section section2 = new Section();
        section2.setId("2");
        section2.setName("Level2 Excel");
        section2.setDescription("Desc1");
        section2.setStatus(SectionStatus.DRAFT);
        section2.addTask(task2);
        task2.setSection(section2);
        mongoTemplate.save(task2);
        mongoTemplate.save(section2);

        Course course = new Course();
        course.setId("0");
        course.setName("Excel");
        course.setDescription("This is a description field");
        course.setStatus(CourseStatus.DRAFT);
        course.addSection(section1);
        course.addSection(section2);

        mongoTemplate.save(course);
    }

}
