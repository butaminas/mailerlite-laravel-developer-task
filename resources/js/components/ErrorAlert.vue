<template>
    <div
        v-if="errorMessage"
        class="alert alert-error absolute bottom-10 right-10 left-auto z-50 max-w-lg shadow-lg"
    >
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                @click="utilitiesStore.errorMessage = null"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>{{ errorMessage }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUtilitiesStore } from "../store/utilitiesStore"
import { storeToRefs } from "pinia"

const utilitiesStore = useUtilitiesStore()
const { errorMessage } = storeToRefs(utilitiesStore)

utilitiesStore.$subscribe((mutation, state) => {
    setTimeout(() => {
        state.errorMessage = null
    }, 10000)
})
</script>
