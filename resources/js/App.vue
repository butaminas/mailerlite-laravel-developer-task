<template>
    <Transition>
        <error-alert />
    </Transition>
    <div class="container mx-auto min-h-screen bg-base-100">
        <div
            class="flex h-screen flex-row flex-wrap items-center justify-center py-4"
        >
            <main role="main" class="w-full px-2 pt-1 sm:w-2/3 md:w-3/4">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ErrorAlert from "./components/ErrorAlert.vue"
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
