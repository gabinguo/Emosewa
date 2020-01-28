package com.emosewa.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.emosewa.app.web.rest.TestUtil;

public class OptionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Option.class);
        Option option1 = new Option();
        option1.setId(1L);
        Option option2 = new Option();
        option2.setId(option1.getId());
        assertThat(option1).isEqualTo(option2);
        option2.setId(2L);
        assertThat(option1).isNotEqualTo(option2);
        option1.setId(null);
        assertThat(option1).isNotEqualTo(option2);
    }
}
