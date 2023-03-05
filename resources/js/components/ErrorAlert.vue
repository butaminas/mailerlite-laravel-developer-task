<template>
    <div
        v-if="message"
        class="alert absolute bottom-10 right-10 left-auto z-50 max-w-lg shadow-lg"
        :class="{
            'alert-error': message.error,
            'alert-success text-white': !message.error
        }"
    >
        <div>
            <button
                class="btn btn-link btn-xs"
                @click="utilitiesStore.message = null"
            >
                <XMarkIcon
                    class="h-6 w-6 flex-shrink-0 fill-none stroke-white"
                />
            </button>
            <span>{{
                message.text === "default"
                    ? "There was an error with the request."
                    : message.text
            }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUtilitiesStore } from "../store/utilitiesStore"
import { storeToRefs } from "pinia"
import { XMarkIcon } from "@heroicons/vue/24/solid"

const utilitiesStore = useUtilitiesStore()
const { message } = storeToRefs(utilitiesStore)

utilitiesStore.$subscribe((mutation, state) => {
    setTimeout(() => {
        state.message = null
    }, 10000)
})
</script>
