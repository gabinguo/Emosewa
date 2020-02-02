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
                        <span v-text="$t('emosewaApp.question.type')">Type</span>
                    </dt>
                    <dd>
                        <div v-if="question.type">
                            <router-link :to="{name: 'QuestionTypeView', params: {questionTypeId: question.type.id}}">{{question.type.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.question.options')">Options</span>
                    </dt>
                    <dd>
                        <span v-for="(options, i) in question.options" :key="options.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'OptionView', params: {optionId: options.id}}">{{options.description}}</router-link>
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
