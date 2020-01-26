package com.godzula.repository;

import com.godzula.domain.Section;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the Section entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SectionRepository extends MongoRepository<Section, String> {
    List<Section> findByCourseId(String id);

}
