package com.emosewa.app.web.rest;

import com.emosewa.app.EmosewaApp;
import com.emosewa.app.domain.Choice;
import com.emosewa.app.repository.ChoiceRepository;
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
 * Integration tests for the {@link ChoiceResource} REST controller.
 */
@SpringBootTest(classes = EmosewaApp.class)
public class ChoiceResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PICTURE_URL = "AAAAAAAAAA";
    private static final String UPDATED_PICTURE_URL = "BBBBBBBBBB";

    private static final String DEFAULT_VIDEO_URL = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_URL = "BBBBBBBBBB";

    @Autowired
    private ChoiceRepository choiceRepository;

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

    private MockMvc restChoiceMockMvc;

    private Choice choice;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChoiceResource choiceResource = new ChoiceResource(choiceRepository);
        this.restChoiceMockMvc = MockMvcBuilders.standaloneSetup(choiceResource)
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
    public static Choice createEntity(EntityManager em) {
        Choice choice = new Choice()
            .description(DEFAULT_DESCRIPTION)
            .pictureURL(DEFAULT_PICTURE_URL)
            .videoURL(DEFAULT_VIDEO_URL);
        return choice;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Choice createUpdatedEntity(EntityManager em) {
        Choice choice = new Choice()
            .description(UPDATED_DESCRIPTION)
            .pictureURL(UPDATED_PICTURE_URL)
            .videoURL(UPDATED_VIDEO_URL);
        return choice;
    }

    @BeforeEach
    public void initTest() {
        choice = createEntity(em);
    }

    @Test
    @Transactional
    public void createChoice() throws Exception {
        int databaseSizeBeforeCreate = choiceRepository.findAll().size();

        // Create the Choice
        restChoiceMockMvc.perform(post("/api/choices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(choice)))
            .andExpect(status().isCreated());

        // Validate the Choice in the database
        List<Choice> choiceList = choiceRepository.findAll();
        assertThat(choiceList).hasSize(databaseSizeBeforeCreate + 1);
        Choice testChoice = choiceList.get(choiceList.size() - 1);
        assertThat(testChoice.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testChoice.getPictureURL()).isEqualTo(DEFAULT_PICTURE_URL);
        assertThat(testChoice.getVideoURL()).isEqualTo(DEFAULT_VIDEO_URL);
    }

    @Test
    @Transactional
    public void createChoiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = choiceRepository.findAll().size();

        // Create the Choice with an existing ID
        choice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChoiceMockMvc.perform(post("/api/choices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(choice)))
            .andExpect(status().isBadRequest());

        // Validate the Choice in the database
        List<Choice> choiceList = choiceRepository.findAll();
        assertThat(choiceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllChoices() throws Exception {
        // Initialize the database
        choiceRepository.saveAndFlush(choice);

        // Get all the choiceList
        restChoiceMockMvc.perform(get("/api/choices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(choice.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].pictureURL").value(hasItem(DEFAULT_PICTURE_URL)))
            .andExpect(jsonPath("$.[*].videoURL").value(hasItem(DEFAULT_VIDEO_URL)));
    }
    
    @Test
    @Transactional
    public void getChoice() throws Exception {
        // Initialize the database
        choiceRepository.saveAndFlush(choice);

        // Get the choice
        restChoiceMockMvc.perform(get("/api/choices/{id}", choice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(choice.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.pictureURL").value(DEFAULT_PICTURE_URL))
            .andExpect(jsonPath("$.videoURL").value(DEFAULT_VIDEO_URL));
    }

    @Test
    @Transactional
    public void getNonExistingChoice() throws Exception {
        // Get the choice
        restChoiceMockMvc.perform(get("/api/choices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChoice() throws Exception {
        // Initialize the database
        choiceRepository.saveAndFlush(choice);

        int databaseSizeBeforeUpdate = choiceRepository.findAll().size();

        // Update the choice
        Choice updatedChoice = choiceRepository.findById(choice.getId()).get();
        // Disconnect from session so that the updates on updatedChoice are not directly saved in db
        em.detach(updatedChoice);
        updatedChoice
            .description(UPDATED_DESCRIPTION)
            .pictureURL(UPDATED_PICTURE_URL)
            .videoURL(UPDATED_VIDEO_URL);

        restChoiceMockMvc.perform(put("/api/choices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChoice)))
            .andExpect(status().isOk());

        // Validate the Choice in the database
        List<Choice> choiceList = choiceRepository.findAll();
        assertThat(choiceList).hasSize(databaseSizeBeforeUpdate);
        Choice testChoice = choiceList.get(choiceList.size() - 1);
        assertThat(testChoice.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testChoice.getPictureURL()).isEqualTo(UPDATED_PICTURE_URL);
        assertThat(testChoice.getVideoURL()).isEqualTo(UPDATED_VIDEO_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingChoice() throws Exception {
        int databaseSizeBeforeUpdate = choiceRepository.findAll().size();

        // Create the Choice

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChoiceMockMvc.perform(put("/api/choices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(choice)))
            .andExpect(status().isBadRequest());

        // Validate the Choice in the database
        List<Choice> choiceList = choiceRepository.findAll();
        assertThat(choiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChoice() throws Exception {
        // Initialize the database
        choiceRepository.saveAndFlush(choice);

        int databaseSizeBeforeDelete = choiceRepository.findAll().size();

        // Delete the choice
        restChoiceMockMvc.perform(delete("/api/choices/{id}", choice.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Choice> choiceList = choiceRepository.findAll();
        assertThat(choiceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
