<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('emosewaApp.player.home.title')" id="player-heading">Players</span>
            <router-link :to="{name: 'PlayerCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-player">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('emosewaApp.player.home.createLabel')">
                    Create a new Player
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
        <div class="alert alert-warning" v-if="!isFetching && players && players.length === 0">
            <span v-text="$t('emosewaApp.player.home.notFound')">No players found</span>
        </div>
        <div class="table-responsive" v-if="players && players.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('emosewaApp.player.name')">Name</span></th>
                    <th><span v-text="$t('emosewaApp.player.password')">Password</span></th>
                    <th><span v-text="$t('emosewaApp.player.email')">Email</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="player in players"
                    :key="player.id">
                    <td>
                        <router-link :to="{name: 'PlayerView', params: {playerId: player.id}}">{{player.id}}</router-link>
                    </td>
                    <td>{{player.name}}</td>
                    <td>{{player.password}}</td>
                    <td>{{player.email}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'PlayerView', params: {playerId: player.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'PlayerEdit', params: {playerId: player.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(player)"
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
            <span slot="modal-title"><span id="emosewaApp.player.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-player-heading" v-bind:title="$t('emosewaApp.player.delete.question')">Are you sure you want to delete this Player?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-player" v-text="$t('entity.action.delete')" v-on:click="removePlayer()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./player.component.ts">
</script>
