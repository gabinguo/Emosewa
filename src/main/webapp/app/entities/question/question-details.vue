<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="question">
                <h2 class="jh-entity-heading"><span v-text="$t('emosewaApp.question.detail.title')">Question</span> {{question.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('emosewaApp.question.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{question.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.question.pictureURL')">Picture URL</span>
                    </dt>
                    <dd>
                        <span>{{question.pictureURL}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.question.videoURL')">Video URL</span>
                    </dt>
                    <dd>
                        <span>{{question.videoURL}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.question.level')">Level</span>
                    </dt>
                    <dd>
                        <span v-text="$t('emosewaApp.Level.' + question.level)">{{question.level}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.question.answer')">Answer</span>
                    </dt>
                    <dd>
                        <span v-text="$t('emosewaApp.CorrectNumber.' + question.answer)">{{question.answer}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.question.type')">Type</span>
                    </dt>
                    <dd>
                        <div v-if="question.type">
                            <router-link :to="{name: 'QuestionTypeView', params: {questionTypeId: question.type.id}}">{{question.type.typeName}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.question.choices')">Choices</span>
                    </dt>
                    <dd>
                        <span v-for="(choices, i) in question.choices" :key="choices.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'ChoiceView', params: {choiceId: choices.id}}">{{choices.description}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="question.id" :to="{name: 'QuestionEdit', params: {questionId: question.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./question-details.component.ts">
</script>
