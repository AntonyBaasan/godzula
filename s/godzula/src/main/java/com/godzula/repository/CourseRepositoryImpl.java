package com.godzula.repository;

import com.godzula.domain.CourseMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.query.Criteria;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

import java.util.Collections;
import java.util.List;

public class CourseRepositoryImpl implements CourseRepositoryCustom {

    private static final String ENTITY_NAME = "course";

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<CourseMetadata> findSomething() {
        Aggregation agg = newAggregation(
            match(Criteria.where("status").is("PUBLISHED")),
            project("id", "name", "description", "imageUrl")
                .and(ArrayOperators.Size.lengthOfArray(ConditionalOperators.ifNull("section").then(Collections.emptyList())))
                .as("sectionCount"),

            sort(Sort.Direction.ASC, "name")
        );

        AggregationResults<CourseMetadata> results = mongoTemplate.aggregate(agg, ENTITY_NAME, CourseMetadata.class);

        return results.getMappedResults();
    }
}
