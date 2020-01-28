package com.emosewa.app.web.rest;

import com.emosewa.app.domain.QuizType;
import com.emosewa.app.repository.QuizTypeRepository;
import com.emosewa.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.emosewa.app.domain.QuizType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class QuizTypeResource {

    private final Logger log = LoggerFactory.getLogger(QuizTypeResource.class);

    private static final String ENTITY_NAME = "quizType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuizTypeRepository quizTypeRepository;

    public QuizTypeResource(QuizTypeRepository quizTypeRepository) {
        this.quizTypeRepository = quizTypeRepository;
    }

    /**
     * {@code POST  /quiz-types} : Create a new quizType.
     *
     * @param quizType the quizType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quizType, or with status {@code 400 (Bad Request)} if the quizType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/quiz-types")
    public ResponseEntity<QuizType> createQuizType(@RequestBody QuizType quizType) throws URISyntaxException {
        log.debug("REST request to save QuizType : {}", quizType);
        if (quizType.getId() != null) {
            throw new BadRequestAlertException("A new quizType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuizType result = quizTypeRepository.save(quizType);
        return ResponseEntity.created(new URI("/api/quiz-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /quiz-types} : Updates an existing quizType.
     *
     * @param quizType the quizType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizType,
     * or with status {@code 400 (Bad Request)} if the quizType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quizType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/quiz-types")
    public ResponseEntity<QuizType> updateQuizType(@RequestBody QuizType quizType) throws URISyntaxException {
        log.debug("REST request to update QuizType : {}", quizType);
        if (quizType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QuizType result = quizTypeRepository.save(quizType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /quiz-types} : get all the quizTypes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quizTypes in body.
     */
    @GetMapping("/quiz-types")
    public List<QuizType> getAllQuizTypes() {
        log.debug("REST request to get all QuizTypes");
        return quizTypeRepository.findAll();
    }

    /**
     * {@code GET  /quiz-types/:id} : get the "id" quizType.
     *
     * @param id the id of the quizType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quizType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/quiz-types/{id}")
    public ResponseEntity<QuizType> getQuizType(@PathVariable Long id) {
        log.debug("REST request to get QuizType : {}", id);
        Optional<QuizType> quizType = quizTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(quizType);
    }

    /**
     * {@code DELETE  /quiz-types/:id} : delete the "id" quizType.
     *
     * @param id the id of the quizType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/quiz-types/{id}")
    public ResponseEntity<Void> deleteQuizType(@PathVariable Long id) {
        log.debug("REST request to delete QuizType : {}", id);
        quizTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
