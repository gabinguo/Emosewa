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
                        <label class="form-control-label" v-text="$t('emosewaApp.report.quiz')" for="report-quiz">Quiz</label>
                        <select class="form-control" id="report-quiz" name="quiz" v-model="report.quiz">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="report.quiz && quizOption.id === report.quiz.id ? report.quiz : quizOption" v-for="quizOption in quizzes" :key="quizOption.id">{{quizOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('emosewaApp.report.player')" for="report-player">Player</label>
                        <select class="form-control" id="report-player" name="player" v-model="report.player">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="report.player && playerOption.id === report.player.id ? report.player : playerOption" v-for="playerOption in players" :key="playerOption.id">{{playerOption.id}}</option>
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
