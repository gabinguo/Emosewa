<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('emosewaApp.option.home.title')" id="option-heading">Options</span>
            <router-link :to="{name: 'OptionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-option">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('emosewaApp.option.home.createLabel')">
                    Create a new Option
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
        <div class="alert alert-warning" v-if="!isFetching && options && options.length === 0">
            <span v-text="$t('emosewaApp.option.home.notFound')">No options found</span>
        </div>
        <div class="table-responsive" v-if="options && options.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('emosewaApp.option.description')">Description</span></th>
                    <th><span v-text="$t('emosewaApp.option.pictureURL')">Picture URL</span></th>
                    <th><span v-text="$t('emosewaApp.option.videoURL')">Video URL</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="option in options"
                    :key="option.id">
                    <td>
                        <router-link :to="{name: 'OptionView', params: {optionId: option.id}}">{{option.id}}</router-link>
                    </td>
                    <td>{{option.description}}</td>
                    <td>{{option.pictureURL}}</td>
                    <td>{{option.videoURL}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'OptionView', params: {optionId: option.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'OptionEdit', params: {optionId: option.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(option)"
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
            <span slot="modal-title"><span id="emosewaApp.option.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-option-heading" v-bind:title="$t('emosewaApp.option.delete.question')">Are you sure you want to delete this Option?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-option" v-text="$t('entity.action.delete')" v-on:click="removeOption()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./option.component.ts">
</script>
