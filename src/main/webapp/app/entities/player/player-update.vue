<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="emosewaApp.player.home.createOrEditLabel" v-text="$t('emosewaApp.player.home.createOrEditLabel')">Create or edit a Player</h2>
                <div>
                    <div class="form-group" v-if="player.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="player.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.player.name')" for="player-name">Name</label>
                        <input type="text" class="form-control" name="name" id="player-name"
                            :class="{'valid': !$v.player.name.$invalid, 'invalid': $v.player.name.$invalid }" v-model="$v.player.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.player.password')" for="player-password">Password</label>
                        <input type="text" class="form-control" name="password" id="player-password"
                            :class="{'valid': !$v.player.password.$invalid, 'invalid': $v.player.password.$invalid }" v-model="$v.player.password.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('emosewaApp.player.email')" for="player-email">Email</label>
                        <input type="text" class="form-control" name="email" id="player-email"
                            :class="{'valid': !$v.player.email.$invalid, 'invalid': $v.player.email.$invalid }" v-model="$v.player.email.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.player.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./player-update.component.ts">
</script>
