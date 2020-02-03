package com.emosewa.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.emosewa.app.web.rest.TestUtil;

public class ChoiceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Choice.class);
        Choice choice1 = new Choice();
        choice1.setId(1L);
        Choice choice2 = new Choice();
        choice2.setId(choice1.getId());
        assertThat(choice1).isEqualTo(choice2);
        choice2.setId(2L);
        assertThat(choice1).isNotEqualTo(choice2);
        choice1.setId(null);
        assertThat(choice1).isNotEqualTo(choice2);
    }
}
