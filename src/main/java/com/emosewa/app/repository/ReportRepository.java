package com.emosewa.app.repository;
import com.emosewa.app.domain.Report;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Report entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("select report from Report report where report.user.login = ?#{principal.username}")
    List<Report> findByUserIsCurrentUser();

}
