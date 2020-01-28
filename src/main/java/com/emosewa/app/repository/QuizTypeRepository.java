package com.emosewa.app.repository;
import com.emosewa.app.domain.QuizType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QuizType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizTypeRepository extends JpaRepository<QuizType, Long> {

}
