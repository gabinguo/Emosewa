package com.emosewa.app.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.emosewa.app.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.emosewa.app.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.emosewa.app.domain.User.class.getName());
            createCache(cm, com.emosewa.app.domain.Authority.class.getName());
            createCache(cm, com.emosewa.app.domain.User.class.getName() + ".authorities");
            createCache(cm, com.emosewa.app.domain.Question.class.getName());
            createCache(cm, com.emosewa.app.domain.Question.class.getName() + ".options");
            createCache(cm, com.emosewa.app.domain.Quiz.class.getName());
            createCache(cm, com.emosewa.app.domain.Quiz.class.getName() + ".questions");
            createCache(cm, com.emosewa.app.domain.Report.class.getName());
            createCache(cm, com.emosewa.app.domain.Option.class.getName());
            createCache(cm, com.emosewa.app.domain.QuizType.class.getName());
            createCache(cm, com.emosewa.app.domain.QuestionType.class.getName());
            createCache(cm, com.emosewa.app.domain.Question.class.getName() + ".quizzes");
            createCache(cm, com.emosewa.app.domain.Option.class.getName() + ".questions");
            createCache(cm, com.emosewa.app.domain.Question.class.getName() + ".types");
            createCache(cm, com.emosewa.app.domain.Quiz.class.getName() + ".types");
            createCache(cm, com.emosewa.app.domain.QuizType.class.getName() + ".quizzes");
            createCache(cm, com.emosewa.app.domain.QuestionType.class.getName() + ".questions");
            createCache(cm, com.emosewa.app.domain.Question.class.getName() + ".choices");
            createCache(cm, com.emosewa.app.domain.Choice.class.getName());
            createCache(cm, com.emosewa.app.domain.Choice.class.getName() + ".questions");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
