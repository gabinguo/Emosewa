<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="emosewaApp.report.home.createOrEditLabel" v-text="$t('emosewaApp.report.home.createOrEditLabel')">Create or edit a Report</h2>
                <div>
                    <div class="form-group" v-if="report.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="report.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.report.name')" for="report-name">Name</label>
                        <input type="text" class="form-control" name="name" id="report-name"
                            :class="{'valid': !$v.report.name.$invalid, 'invalid': $v.report.name.$invalid }" v-model="$v.report.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('emosewaApp.report.user')" for="report-user">User</label>
                        <select class="form-control" id="report-user" name="user" v-model="report.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="report.user && userOption.id === report.user.id ? report.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.report.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./report-update.component.ts">
</script>
