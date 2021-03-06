package com.emosewa.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import net.bytebuddy.agent.builder.AgentBuilder.InitializationStrategy.SelfInjection.Eager;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.emosewa.app.domain.enumeration.Level;

import com.emosewa.app.domain.enumeration.CorrectNumber;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "picture_url")
    private String pictureURL;

    @Column(name = "video_url")
    private String videoURL;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private Level level;

    @Enumerated(EnumType.STRING)
    @Column(name = "answer")
    private CorrectNumber answer;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private QuestionType type;

    @ManyToMany(fetch=FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "question_choices",
               joinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "choices_id", referencedColumnName = "id"))
    private Set<Choice> choices = new HashSet<>();

    @ManyToMany(mappedBy = "questions")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Quiz> quizzes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Question description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPictureURL() {
        return pictureURL;
    }

    public Question pictureURL(String pictureURL) {
        this.pictureURL = pictureURL;
        return this;
    }

    public void setPictureURL(String pictureURL) {
        this.pictureURL = pictureURL;
    }

    public String getVideoURL() {
        return videoURL;
    }

    public Question videoURL(String videoURL) {
        this.videoURL = videoURL;
        return this;
    }

    public void setVideoURL(String videoURL) {
        this.videoURL = videoURL;
    }

    public Level getLevel() {
        return level;
    }

    public Question level(Level level) {
        this.level = level;
        return this;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public CorrectNumber getAnswer() {
        return answer;
    }

    public Question answer(CorrectNumber answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(CorrectNumber answer) {
        this.answer = answer;
    }

    public QuestionType getType() {
        return type;
    }

    public Question type(QuestionType questionType) {
        this.type = questionType;
        return this;
    }

    public void setType(QuestionType questionType) {
        this.type = questionType;
    }

    public Set<Choice> getChoices() {
        return choices;
    }

    public Question choices(Set<Choice> choices) {
        this.choices = choices;
        return this;
    }

    public Question addChoices(Choice choice) {
        this.choices.add(choice);
        choice.getQuestions().add(this);
        return this;
    }

    public Question removeChoices(Choice choice) {
        this.choices.remove(choice);
        choice.getQuestions().remove(this);
        return this;
    }

    public void setChoices(Set<Choice> choices) {
        this.choices = choices;
    }

    public Set<Quiz> getQuizzes() {
        return quizzes;
    }

    public Question quizzes(Set<Quiz> quizzes) {
        this.quizzes = quizzes;
        return this;
    }

    public Question addQuiz(Quiz quiz) {
        this.quizzes.add(quiz);
        quiz.getQuestions().add(this);
        return this;
    }

    public Question removeQuiz(Quiz quiz) {
        this.quizzes.remove(quiz);
        quiz.getQuestions().remove(this);
        return this;
    }

    public void setQuizzes(Set<Quiz> quizzes) {
        this.quizzes = quizzes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", pictureURL='" + getPictureURL() + "'" +
            ", videoURL='" + getVideoURL() + "'" +
            ", level='" + getLevel() + "'" +
            ", answer='" + getAnswer() + "'" +
            "}";
    }
}
