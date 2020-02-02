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
                        <label class="form-control-label" v-text="$t('emosewaApp.question.type')" for="question-type">Type</label>
                        <select class="form-control" id="question-type" name="type" v-model="question.type">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="question.type && questionTypeOption.id === question.type.id ? question.type : questionTypeOption" v-for="questionTypeOption in types" :key="questionTypeOption.id">{{questionTypeOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('emosewaApp.question.options')" for="question-options">Options</label>
                        <select class="form-control" id="question-options" multiple name="options" v-model="question.options">
                            <option v-bind:value="getSelected(question.options, optionOption)" v-for="optionOption in options" :key="optionOption.id">{{optionOption.description}}</option>
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
