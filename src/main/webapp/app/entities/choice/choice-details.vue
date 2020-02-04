<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="choice">
                <h2 class="jh-entity-heading"><span v-text="$t('emosewaApp.choice.detail.title')">Choice</span> {{choice.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('emosewaApp.choice.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{choice.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.choice.pictureURL')">Picture URL</span>
                    </dt>
                    <dd>
                        <span>{{choice.pictureURL}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.choice.videoURL')">Video URL</span>
                    </dt>
                    <dd>
                        <span>{{choice.videoURL}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="choice.id" :to="{name: 'ChoiceEdit', params: {choiceId: choice.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./choice-details.component.ts">
</script>
