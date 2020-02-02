<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="option">
                <h2 class="jh-entity-heading"><span v-text="$t('emosewaApp.option.detail.title')">Option</span> {{option.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('emosewaApp.option.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{option.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.option.pictureURL')">Picture URL</span>
                    </dt>
                    <dd>
                        <span>{{option.pictureURL}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('emosewaApp.option.videoURL')">Video URL</span>
                    </dt>
                    <dd>
                        <span>{{option.videoURL}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="option.id" :to="{name: 'OptionEdit', params: {optionId: option.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./option-details.component.ts">
</script>
