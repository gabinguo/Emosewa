package com.emosewa.app.web.rest;

import com.emosewa.app.EmosewaApp;
import com.emosewa.app.domain.QuizType;
import com.emosewa.app.repository.QuizTypeRepository;
import com.emosewa.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.emosewa.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link QuizTypeResource} REST controller.
 */
@SpringBootTest(classes = EmosewaApp.class)
public class QuizTypeResourceIT {

    private static final String DEFAULT_TYPE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_NAME = "BBBBBBBBBB";

    @Autowired
    private QuizTypeRepository quizTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restQuizTypeMockMvc;

    private QuizType quizType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuizTypeResource quizTypeResource = new QuizTypeResource(quizTypeRepository);
        this.restQuizTypeMockMvc = MockMvcBuilders.standaloneSetup(quizTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizType createEntity(EntityManager em) {
        QuizType quizType = new QuizType()
            .typeName(DEFAULT_TYPE_NAME);
        return quizType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizType createUpdatedEntity(EntityManager em) {
        QuizType quizType = new QuizType()
            .typeName(UPDATED_TYPE_NAME);
        return quizType;
    }

    @BeforeEach
    public void initTest() {
        quizType = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuizType() throws Exception {
        int databaseSizeBeforeCreate = quizTypeRepository.findAll().size();

        // Create the QuizType
        restQuizTypeMockMvc.perform(post("/api/quiz-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizType)))
            .andExpect(status().isCreated());

        // Validate the QuizType in the database
        List<QuizType> quizTypeList = quizTypeRepository.findAll();
        assertThat(quizTypeList).hasSize(databaseSizeBeforeCreate + 1);
        QuizType testQuizType = quizTypeList.get(quizTypeList.size() - 1);
        assertThat(testQuizType.getTypeName()).isEqualTo(DEFAULT_TYPE_NAME);
    }

    @Test
    @Transactional
    public void createQuizTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = quizTypeRepository.findAll().size();

        // Create the QuizType with an existing ID
        quizType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizTypeMockMvc.perform(post("/api/quiz-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizType)))
            .andExpect(status().isBadRequest());

        // Validate the QuizType in the database
        List<QuizType> quizTypeList = quizTypeRepository.findAll();
        assertThat(quizTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQuizTypes() throws Exception {
        // Initialize the database
        quizTypeRepository.saveAndFlush(quizType);

        // Get all the quizTypeList
        restQuizTypeMockMvc.perform(get("/api/quiz-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quizType.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeName").value(hasItem(DEFAULT_TYPE_NAME)));
    }
    
    @Test
    @Transactional
    public void getQuizType() throws Exception {
        // Initialize the database
        quizTypeRepository.saveAndFlush(quizType);

        // Get the quizType
        restQuizTypeMockMvc.perform(get("/api/quiz-types/{id}", quizType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(quizType.getId().intValue()))
            .andExpect(jsonPath("$.typeName").value(DEFAULT_TYPE_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingQuizType() throws Exception {
        // Get the quizType
        restQuizTypeMockMvc.perform(get("/api/quiz-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuizType() throws Exception {
        // Initialize the database
        quizTypeRepository.saveAndFlush(quizType);

        int databaseSizeBeforeUpdate = quizTypeRepository.findAll().size();

        // Update the quizType
        QuizType updatedQuizType = quizTypeRepository.findById(quizType.getId()).get();
        // Disconnect from session so that the updates on updatedQuizType are not directly saved in db
        em.detach(updatedQuizType);
        updatedQuizType
            .typeName(UPDATED_TYPE_NAME);

        restQuizTypeMockMvc.perform(put("/api/quiz-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuizType)))
            .andExpect(status().isOk());

        // Validate the QuizType in the database
        List<QuizType> quizTypeList = quizTypeRepository.findAll();
        assertThat(quizTypeList).hasSize(databaseSizeBeforeUpdate);
        QuizType testQuizType = quizTypeList.get(quizTypeList.size() - 1);
        assertThat(testQuizType.getTypeName()).isEqualTo(UPDATED_TYPE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingQuizType() throws Exception {
        int databaseSizeBeforeUpdate = quizTypeRepository.findAll().size();

        // Create the QuizType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizTypeMockMvc.perform(put("/api/quiz-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizType)))
            .andExpect(status().isBadRequest());

        // Validate the QuizType in the database
        List<QuizType> quizTypeList = quizTypeRepository.findAll();
        assertThat(quizTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuizType() throws Exception {
        // Initialize the database
        quizTypeRepository.saveAndFlush(quizType);

        int databaseSizeBeforeDelete = quizTypeRepository.findAll().size();

        // Delete the quizType
        restQuizTypeMockMvc.perform(delete("/api/quiz-types/{id}", quizType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuizType> quizTypeList = quizTypeRepository.findAll();
        assertThat(quizTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
