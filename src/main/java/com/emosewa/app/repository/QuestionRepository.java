package com.emosewa.app.repository;
import com.emosewa.app.domain.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Question entity.
 */
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(value = "select distinct question from Question question left join fetch question.choices",
        countQuery = "select count(distinct question) from Question question")
    Page<Question> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct question from Question question left join fetch question.choices")
    List<Question> findAllWithEagerRelationships();

    @Query("select question from Question question left join fetch question.choices where question.id =:id")
    Optional<Question> findOneWithEagerRelationships(@Param("id") Long id);

}
