package com.godzula.service.impl;

import com.godzula.domain.enumeration.CourseStatus;
import com.godzula.service.SectionService;
import com.godzula.domain.Section;
import com.godzula.repository.SectionRepository;
import com.godzula.service.dto.SectionDTO;
import com.godzula.service.mapper.SectionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Section.
 */
@Service
public class SectionServiceImpl implements SectionService {

    private final Logger log = LoggerFactory.getLogger(SectionServiceImpl.class);

    private final SectionRepository sectionRepository;

    private final SectionMapper sectionMapper;

    public SectionServiceImpl(SectionRepository sectionRepository, SectionMapper sectionMapper) {
        this.sectionRepository = sectionRepository;
        this.sectionMapper = sectionMapper;
    }

    /**
     * Save a section.
     *
     * @param sectionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SectionDTO save(SectionDTO sectionDTO) {
        log.debug("Request to save Section : {}", sectionDTO);

        Section section = sectionMapper.toEntity(sectionDTO);
        section = sectionRepository.save(section);
        return sectionMapper.toDto(section);
    }

    /**
     * Get all the sections.
     *
     * @return the list of entities
     */
    @Override
    public List<SectionDTO> findAll() {
        log.debug("Request to get all Sections");
        return sectionRepository.findAll().stream()
            .map(sectionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one section by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<SectionDTO> findOne(String id) {
        log.debug("Request to get Section : {}", id);
        return sectionRepository.findById(id)
            .map(sectionMapper::toDto);
    }

    /**
     * Delete the section by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Section : {}", id);
        sectionRepository.deleteById(id);
    }

    @Override
    public List<SectionDTO> findByCourseId(String id) {
        return sectionRepository.findByCourseId(id).stream()
            .map(sectionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
}
