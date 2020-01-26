package com.godzula.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.godzula.service.CourseService;
import com.godzula.service.SectionService;
import com.godzula.service.dto.CourseDTO;
import com.godzula.service.dto.FullCourseDTO;
import com.godzula.service.dto.SectionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Course.
 */
@RestController
@RequestMapping("/api/public")
public class PublicCourseResource {

    private final Logger log = LoggerFactory.getLogger(PublicCourseResource.class);

    private static final String ENTITY_NAME = "course";

    private final CourseService courseService;
    private final SectionService sectionService;

    public PublicCourseResource(
        CourseService courseService,
        SectionService sectionService
    ) {
        this.courseService = courseService;
        this.sectionService = sectionService;
    }

    @GetMapping("/courses")
    @Timed
    public List<CourseDTO> getAllCoursesMetadata() {
        log.debug("REST request to get all Courses metadata");
        return courseService.findAllPublished();
    }

    /**
     * GET  /courses/:id : get the "id" course.
     *
     * @param id the id of the courseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the courseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/courses/{id}")
    @Timed
    public ResponseEntity<FullCourseDTO> getCourse(@PathVariable String id) {
        log.debug("REST request to get Course : {}", id);
        Optional<CourseDTO> courseDTO = courseService.findOne(id);
        if(courseDTO.isPresent()){
            List<SectionDTO> sections = sectionService.findByCourseId(id);
            FullCourseDTO courseWithSections = new FullCourseDTO();
            courseWithSections.setCourse(courseDTO.get());
            courseWithSections.setSections(sections);
            return ResponseEntity.ok(courseWithSections);

        }else{
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
