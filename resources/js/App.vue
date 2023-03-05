<template>
    <Transition>
        <error-alert />
    </Transition>
    <div class="drawer">
        <input
            :checked="state.subscribersDrawer"
            type="checkbox"
            class="drawer-toggle"
        />
        <input
            :checked="state.fieldsDrawer"
            type="checkbox"
            class="drawer-toggle"
        />
        <div class="drawer-content">
            <div
                class="container drawer-content mx-auto min-h-screen bg-base-100"
            >
                <div
                    class="flex h-screen flex-row flex-wrap items-center justify-center py-4"
                >
                    <main
                        role="main"
                        class="w-full px-2 pt-1 sm:w-2/3 md:w-3/4"
                    >
                        <router-view />
                    </main>
                </div>
            </div>
        </div>
        <SubscribersDrawer v-if="!state.fieldsDrawer" />
        <FieldsDrawer v-if="!state.subscribersDrawer" />
    </div>
</template>

<script lang="ts" setup>
import ErrorAlert from "./components/ErrorAlert.vue"
import FieldsDrawer from "./views/fields/FieldsDrawer.vue"
import SubscribersDrawer from "./views/subscribers/SubscribersDrawer.vue"
import { provide, reactive } from "vue"
import { AppStateType } from "./types"

const state = reactive<AppStateType>({
    subscribersDrawer: false,
    fieldsDrawer: false
})

provide("appState", state)
</script>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
