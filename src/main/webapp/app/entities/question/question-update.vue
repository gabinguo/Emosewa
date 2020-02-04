<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="emosewaApp.question.home.createOrEditLabel" v-text="$t('emosewaApp.question.home.createOrEditLabel')">Create or edit a Question</h2>
                <div>
                    <div class="form-group" v-if="question.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="question.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.question.description')" for="question-description">Description</label>
                        <input type="text" class="form-control" name="description" id="question-description"
                            :class="{'valid': !$v.question.description.$invalid, 'invalid': $v.question.description.$invalid }" v-model="$v.question.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.question.pictureURL')" for="question-pictureURL">Picture URL</label>
                        <input type="text" class="form-control" name="pictureURL" id="question-pictureURL"
                            :class="{'valid': !$v.question.pictureURL.$invalid, 'invalid': $v.question.pictureURL.$invalid }" v-model="$v.question.pictureURL.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.question.videoURL')" for="question-videoURL">Video URL</label>
                        <input type="text" class="form-control" name="videoURL" id="question-videoURL"
                            :class="{'valid': !$v.question.videoURL.$invalid, 'invalid': $v.question.videoURL.$invalid }" v-model="$v.question.videoURL.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.question.level')" for="question-level">Level</label>
                        <select class="form-control" name="level" :class="{'valid': !$v.question.level.$invalid, 'invalid': $v.question.level.$invalid }" v-model="$v.question.level.$model" id="question-level" >
                            <option value="EASY" v-bind:label="$t('emosewaApp.Level.EASY')">EASY</option>
                            <option value="MEDIUM" v-bind:label="$t('emosewaApp.Level.MEDIUM')">MEDIUM</option>
                            <option value="HARD" v-bind:label="$t('emosewaApp.Level.HARD')">HARD</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.question.answer')" for="question-answer">Answer</label>
                        <select class="form-control" name="answer" :class="{'valid': !$v.question.answer.$invalid, 'invalid': $v.question.answer.$invalid }" v-model="$v.question.answer.$model" id="question-answer" >
                            <option value="A" v-bind:label="$t('emosewaApp.CorrectNumber.A')">A</option>
                            <option value="B" v-bind:label="$t('emosewaApp.CorrectNumber.B')">B</option>
                            <option value="C" v-bind:label="$t('emosewaApp.CorrectNumber.C')">C</option>
                            <option value="D" v-bind:label="$t('emosewaApp.CorrectNumber.D')">D</option>
                            <option value="E" v-bind:label="$t('emosewaApp.CorrectNumber.E')">E</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('emosewaApp.question.type')" for="question-type">Type</label>
                        <select class="form-control" id="question-type" name="type" v-model="question.type">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="question.type && questionTypeOption.id === question.type.id ? question.type : questionTypeOption" v-for="questionTypeOption in questionTypes" :key="questionTypeOption.id">{{questionTypeOption.typeName}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('emosewaApp.question.choices')" for="question-choices">Choices</label>
                        <select class="form-control" id="question-choices" multiple name="choices" v-model="question.choices">
                            <option v-bind:value="getSelected(question.choices, choiceOption)" v-for="choiceOption in choices" :key="choiceOption.id">{{choiceOption.description}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.question.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./question-update.component.ts">
</script>
