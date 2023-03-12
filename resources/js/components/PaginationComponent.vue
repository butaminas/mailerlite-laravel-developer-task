<template>
    <div v-if="props.lastPage > 1" class="btn-group">
        <button
            title="Previous page"
            class="btn-sm flex items-center rounded-full rounded-r bg-primary px-4 py-2 text-white"
            :class="{
                'text-opacity-50': props.page === 1
            }"
            :disabled="props.page === 1"
            @click="props.getItems(false)"
        >
            <ChevronLeftIcon class="h-5 w-5" />
        </button>
        <div class="flex items-center bg-primary text-sm text-white">
            Page {{ props.page }}/{{ props.lastPage }}
        </div>
        <button
            title="Next page"
            class="btn-sm flex items-center rounded-full rounded-l bg-primary px-4 py-2 text-white"
            :class="{
                'text-opacity-50': props.page === props.lastPage
            }"
            :disabled="props.page === props.lastPage"
            @click="props.getItems()"
        >
            <ChevronRightIcon class="h-5 w-5" />
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/solid"

const props = defineProps({
    getItems: { type: Function, required: true },
    page: { type: Number, required: true },
    lastPage: { type: Number, required: true }
})
</script>
