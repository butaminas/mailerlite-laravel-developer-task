<template>
    <h1 class="mb-10 w-full text-center text-3xl font-bold lg:text-5xl">
        My subscribers
    </h1>
    <div class="mb-5 flex w-full flex-row">
        <div class="flex-1">
            <button
                class="drawer-button btn-primary btn btn-sm"
                @click="appState.subscribersDrawer = !appState.subscribersDrawer"
            >
                + subscriber
            </button>
        </div>
    </div>
    <div
        class="flex flex-row flex-wrap items-center space-y-5 text-center lg:flex-row lg:text-left"
    >
        <subscriber-list />
    </div>
</template>

<script setup lang="ts">
import SubscriberList from "./subscribers/SubscriberList.vue"
import { inject } from "vue"

const appState = inject("appState")
</script>
