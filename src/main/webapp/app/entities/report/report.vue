<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('emosewaApp.report.home.title')" id="report-heading">Reports</span>
            <router-link :to="{name: 'ReportCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-report">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('emosewaApp.report.home.createLabel')">
                    Create a new Report
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
        <div class="alert alert-warning" v-if="!isFetching && reports && reports.length === 0">
            <span v-text="$t('emosewaApp.report.home.notFound')">No reports found</span>
        </div>
        <div class="table-responsive" v-if="reports && reports.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('emosewaApp.report.name')">Name</span></th>
                    <th><span v-text="$t('emosewaApp.report.user')">User</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="report in reports"
                    :key="report.id">
                    <td>
                        <router-link :to="{name: 'ReportView', params: {reportId: report.id}}">{{report.id}}</router-link>
                    </td>
                    <td>{{report.name}}</td>
                    <td>
                        {{report.user ? report.user.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ReportView', params: {reportId: report.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ReportEdit', params: {reportId: report.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(report)"
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
            <span slot="modal-title"><span id="emosewaApp.report.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-report-heading" v-bind:title="$t('emosewaApp.report.delete.question')">Are you sure you want to delete this Report?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-report" v-text="$t('entity.action.delete')" v-on:click="removeReport()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./report.component.ts">
</script>
