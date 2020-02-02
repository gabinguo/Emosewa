<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="report">
                <h2 class="jh-entity-heading"><span v-text="$t('emosewaApp.report.detail.title')">Report</span> {{report.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('emosewaApp.report.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{report.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.report.user')">User</span>
                    </dt>
                    <dd>
                        {{report.user ? report.user.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="report.id" :to="{name: 'ReportEdit', params: {reportId: report.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./report-details.component.ts">
</script>
