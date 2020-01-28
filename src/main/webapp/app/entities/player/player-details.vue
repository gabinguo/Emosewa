<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="player">
                <h2 class="jh-entity-heading"><span v-text="$t('emosewaApp.player.detail.title')">Player</span> {{player.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('emosewaApp.player.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{player.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.player.password')">Password</span>
                    </dt>
                    <dd>
                        <span>{{player.password}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.player.email')">Email</span>
                    </dt>
                    <dd>
                        <span>{{player.email}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="player.id" :to="{name: 'PlayerEdit', params: {playerId: player.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./player-details.component.ts">
</script>
