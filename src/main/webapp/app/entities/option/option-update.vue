<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="emosewaApp.option.home.createOrEditLabel" v-text="$t('emosewaApp.option.home.createOrEditLabel')">Create or edit a Option</h2>
                <div>
                    <div class="form-group" v-if="option.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="option.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.option.description')" for="option-description">Description</label>
                        <input type="text" class="form-control" name="description" id="option-description"
                            :class="{'valid': !$v.option.description.$invalid, 'invalid': $v.option.description.$invalid }" v-model="$v.option.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.option.pictureURL')" for="option-pictureURL">Picture URL</label>
                        <input type="text" class="form-control" name="pictureURL" id="option-pictureURL"
                            :class="{'valid': !$v.option.pictureURL.$invalid, 'invalid': $v.option.pictureURL.$invalid }" v-model="$v.option.pictureURL.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.option.videoURL')" for="option-videoURL">Video URL</label>
                        <input type="text" class="form-control" name="videoURL" id="option-videoURL"
                            :class="{'valid': !$v.option.videoURL.$invalid, 'invalid': $v.option.videoURL.$invalid }" v-model="$v.option.videoURL.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.option.level')" for="option-level">Level</label>
                        <select class="form-control" name="level" :class="{'valid': !$v.option.level.$invalid, 'invalid': $v.option.level.$invalid }" v-model="$v.option.level.$model" id="option-level" >
                            <option value="EASY" v-bind:label="$t('emosewaApp.Level.EASY')">EASY</option>
                            <option value="MEDIUM" v-bind:label="$t('emosewaApp.Level.MEDIUM')">MEDIUM</option>
                            <option value="HARD" v-bind:label="$t('emosewaApp.Level.HARD')">HARD</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.option.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./option-update.component.ts">
</script>
