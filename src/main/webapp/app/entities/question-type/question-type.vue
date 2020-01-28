<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('emosewaApp.questionType.home.title')" id="question-type-heading">Question Types</span>
            <router-link :to="{name: 'QuestionTypeCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-question-type">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('emosewaApp.questionType.home.createLabel')">
                    Create a new Question Type
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
        <div class="alert alert-warning" v-if="!isFetching && questionTypes && questionTypes.length === 0">
            <span v-text="$t('emosewaApp.questionType.home.notFound')">No questionTypes found</span>
        </div>
        <div class="table-responsive" v-if="questionTypes && questionTypes.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('emosewaApp.questionType.typeName')">Type Name</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="questionType in questionTypes"
                    :key="questionType.id">
                    <td>
                        <router-link :to="{name: 'QuestionTypeView', params: {questionTypeId: questionType.id}}">{{questionType.id}}</router-link>
                    </td>
                    <td>{{questionType.typeName}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'QuestionTypeView', params: {questionTypeId: questionType.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'QuestionTypeEdit', params: {questionTypeId: questionType.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(questionType)"
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
            <span slot="modal-title"><span id="emosewaApp.questionType.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-questionType-heading" v-bind:title="$t('emosewaApp.questionType.delete.question')">Are you sure you want to delete this Question Type?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-questionType" v-text="$t('entity.action.delete')" v-on:click="removeQuestionType()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./question-type.component.ts">
</script>
