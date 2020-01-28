<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('emosewaApp.quiz.home.title')" id="quiz-heading">Quizzes</span>
            <router-link :to="{name: 'QuizCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-quiz">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('emosewaApp.quiz.home.createLabel')">
                    Create a new Quiz
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
        <div class="alert alert-warning" v-if="!isFetching && quizzes && quizzes.length === 0">
            <span v-text="$t('emosewaApp.quiz.home.notFound')">No quizzes found</span>
        </div>
        <div class="table-responsive" v-if="quizzes && quizzes.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('emosewaApp.quiz.name')">Name</span></th>
                    <th><span v-text="$t('emosewaApp.quiz.type')">Type</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="quiz in quizzes"
                    :key="quiz.id">
                    <td>
                        <router-link :to="{name: 'QuizView', params: {quizId: quiz.id}}">{{quiz.id}}</router-link>
                    </td>
                    <td>{{quiz.name}}</td>
                    <td>
                        <div v-if="quiz.type">
                            <router-link :to="{name: 'QuizTypeView', params: {quizTypeId: quiz.type.id}}">{{quiz.type.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'QuizView', params: {quizId: quiz.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'QuizEdit', params: {quizId: quiz.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(quiz)"
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
            <span slot="modal-title"><span id="emosewaApp.quiz.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-quiz-heading" v-bind:title="$t('emosewaApp.quiz.delete.question')">Are you sure you want to delete this Quiz?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-quiz" v-text="$t('entity.action.delete')" v-on:click="removeQuiz()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./quiz.component.ts">
</script>
