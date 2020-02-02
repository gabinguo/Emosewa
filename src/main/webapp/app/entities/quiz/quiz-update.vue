<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="emosewaApp.quiz.home.createOrEditLabel" v-text="$t('emosewaApp.quiz.home.createOrEditLabel')">Create or edit a Quiz</h2>
                <div>
                    <div class="form-group" v-if="quiz.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="quiz.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.quiz.name')" for="quiz-name">Name</label>
                        <input type="text" class="form-control" name="name" id="quiz-name"
                            :class="{'valid': !$v.quiz.name.$invalid, 'invalid': $v.quiz.name.$invalid }" v-model="$v.quiz.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('emosewaApp.quiz.type')" for="quiz-type">Type</label>
                        <select class="form-control" id="quiz-type" name="type" v-model="quiz.type">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="quiz.type && quizTypeOption.id === quiz.type.id ? quiz.type : quizTypeOption" v-for="quizTypeOption in quizTypes" :key="quizTypeOption.id">{{quizTypeOption.typeName}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('emosewaApp.quiz.questions')" for="quiz-questions">Questions</label>
                        <select class="form-control" id="quiz-questions" multiple name="questions" v-model="quiz.questions">
                            <option v-bind:value="getSelected(quiz.questions, questionOption)" v-for="questionOption in questions" :key="questionOption.id">{{questionOption.description}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.quiz.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./quiz-update.component.ts">
</script>
