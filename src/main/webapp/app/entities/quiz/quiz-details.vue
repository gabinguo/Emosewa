<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="quiz">
                <h2 class="jh-entity-heading"><span v-text="$t('emosewaApp.quiz.detail.title')">Quiz</span> {{quiz.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('emosewaApp.quiz.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{quiz.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.quiz.type')">Type</span>
                    </dt>
                    <dd>
                        <div v-if="quiz.type">
                            <router-link :to="{name: 'QuizTypeView', params: {quizTypeId: quiz.type.id}}">{{quiz.type.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.quiz.questions')">Questions</span>
                    </dt>
                    <dd>
                        <span v-for="(questions, i) in quiz.questions" :key="questions.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'QuestionView', params: {questionId: questions.id}}">{{questions.description}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="quiz.id" :to="{name: 'QuizEdit', params: {quizId: quiz.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./quiz-details.component.ts">
</script>
