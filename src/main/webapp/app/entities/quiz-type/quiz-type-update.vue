<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="emosewaApp.quizType.home.createOrEditLabel" v-text="$t('emosewaApp.quizType.home.createOrEditLabel')">Create or edit a QuizType</h2>
                <div>
                    <div class="form-group" v-if="quizType.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="quizType.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.quizType.typeName')" for="quiz-type-typeName">Type Name</label>
                        <input type="text" class="form-control" name="typeName" id="quiz-type-typeName"
                            :class="{'valid': !$v.quizType.typeName.$invalid, 'invalid': $v.quizType.typeName.$invalid }" v-model="$v.quizType.typeName.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.quizType.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./quiz-type-update.component.ts">
</script>
