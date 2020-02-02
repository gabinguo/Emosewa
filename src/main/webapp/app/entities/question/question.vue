<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('emosewaApp.question.home.title')" id="question-heading">Questions</span>
            <router-link :to="{name: 'QuestionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-question">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('emosewaApp.question.home.createLabel')">
                    Create a new Question
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && questions && questions.length === 0">
            <span v-text="$t('emosewaApp.question.home.notFound')">No questions found</span>
        </div>
        <div class="table-responsive" v-if="questions && questions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('emosewaApp.question.description')">Description</span></th>
                    <th><span v-text="$t('emosewaApp.question.pictureURL')">Picture URL</span></th>
                    <th><span v-text="$t('emosewaApp.question.videoURL')">Video URL</span></th>
                    <th><span v-text="$t('emosewaApp.question.type')">Type</span></th>
                    <th><span v-text="$t('emosewaApp.question.options')">Options</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="question in questions"
                    :key="question.id">
                    <td>
                        <router-link :to="{name: 'QuestionView', params: {questionId: question.id}}">{{question.id}}</router-link>
                    </td>
                    <td>{{question.description}}</td>
                    <td>{{question.pictureURL}}</td>
                    <td>{{question.videoURL}}</td>
                    <td>
                        <div v-if="question.type">
                            <router-link :to="{name: 'QuestionTypeView', params: {questionTypeId: question.type.id}}">{{question.type.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <span v-for="(options, i) in question.options" :key="options.id">{{i > 0 ? ', ' : ''}}
                            <router-link class="form-control-static" :to="{name: 'OptionView', params: {optionId: options.id}}">{{options.description}}</router-link>
                        </span>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'QuestionView', params: {questionId: question.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'QuestionEdit', params: {questionId: question.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(question)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="emosewaApp.question.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-question-heading" v-bind:title="$t('emosewaApp.question.delete.question')">Are you sure you want to delete this Question?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-question" v-text="$t('entity.action.delete')" v-on:click="removeQuestion()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./question.component.ts">
</script>
