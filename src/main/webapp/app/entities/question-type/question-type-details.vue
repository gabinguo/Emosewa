<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="questionType">
                <h2 class="jh-entity-heading"><span v-text="$t('emosewaApp.questionType.detail.title')">QuestionType</span> {{questionType.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('emosewaApp.questionType.typeName')">Type Name</span>
                    </dt>
                    <dd>
                        <span>{{questionType.typeName}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="questionType.id" :to="{name: 'QuestionTypeEdit', params: {questionTypeId: questionType.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./question-type-details.component.ts">
</script>
