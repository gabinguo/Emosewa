<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="emosewaApp.questionType.home.createOrEditLabel" v-text="$t('emosewaApp.questionType.home.createOrEditLabel')">Create or edit a QuestionType</h2>
                <div>
                    <div class="form-group" v-if="questionType.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="questionType.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.questionType.typeName')" for="question-type-typeName">Type Name</label>
                        <input type="text" class="form-control" name="typeName" id="question-type-typeName"
                            :class="{'valid': !$v.questionType.typeName.$invalid, 'invalid': $v.questionType.typeName.$invalid }" v-model="$v.questionType.typeName.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.questionType.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./question-type-update.component.ts">
</script>
