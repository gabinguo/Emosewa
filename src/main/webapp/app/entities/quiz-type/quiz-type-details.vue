<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="quizType">
                <h2 class="jh-entity-heading"><span v-text="$t('emosewaApp.quizType.detail.title')">QuizType</span> {{quizType.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('emosewaApp.quizType.typeName')">Type Name</span>
                    </dt>
                    <dd>
                        <span>{{quizType.typeName}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="quizType.id" :to="{name: 'QuizTypeEdit', params: {quizTypeId: quizType.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./quiz-type-details.component.ts">
</script>
