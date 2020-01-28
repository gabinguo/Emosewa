package com.emosewa.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.emosewa.app.web.rest.TestUtil;

public class QuizTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizType.class);
        QuizType quizType1 = new QuizType();
        quizType1.setId(1L);
        QuizType quizType2 = new QuizType();
        quizType2.setId(quizType1.getId());
        assertThat(quizType1).isEqualTo(quizType2);
        quizType2.setId(2L);
        assertThat(quizType1).isNotEqualTo(quizType2);
        quizType1.setId(null);
        assertThat(quizType1).isNotEqualTo(quizType2);
    }
}
