<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="emosewaApp.choice.home.createOrEditLabel" v-text="$t('emosewaApp.choice.home.createOrEditLabel')">Create or edit a Choice</h2>
                <div>
                    <div class="form-group" v-if="choice.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="choice.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.choice.description')" for="choice-description">Description</label>
                        <input type="text" class="form-control" name="description" id="choice-description"
                            :class="{'valid': !$v.choice.description.$invalid, 'invalid': $v.choice.description.$invalid }" v-model="$v.choice.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.choice.pictureURL')" for="choice-pictureURL">Picture URL</label>
                        <input type="text" class="form-control" name="pictureURL" id="choice-pictureURL"
                            :class="{'valid': !$v.choice.pictureURL.$invalid, 'invalid': $v.choice.pictureURL.$invalid }" v-model="$v.choice.pictureURL.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.choice.videoURL')" for="choice-videoURL">Video URL</label>
                        <input type="text" class="form-control" name="videoURL" id="choice-videoURL"
                            :class="{'valid': !$v.choice.videoURL.$invalid, 'invalid': $v.choice.videoURL.$invalid }" v-model="$v.choice.videoURL.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.choice.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./choice-update.component.ts">
</script>
