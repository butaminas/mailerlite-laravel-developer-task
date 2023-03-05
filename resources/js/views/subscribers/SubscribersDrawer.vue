<template>
    <div class="drawer-side">
        <label
            class="drawer-overlay"
            @click="appState.subscribersDrawer = !appState.subscribersDrawer"
        ></label>
        <div
            class="card w-80 rounded-l-none bg-base-100 shadow-lg dark:bg-base-200 lg:w-96 lg:w-96"
        >
            <div class="card-title sticky mt-4 justify-between px-8">
                <h2 class="justify-center">
                    {{
                        !subscribersStore.subToEdit
                            ? "Add a new subscriber"
                            : "Edit subscriber"
                    }}
                </h2>
                <label
                    class="btn btn-primary btn-xs btn-circle self-end"
                    @click="
                        appState.subscribersDrawer = !appState.subscribersDrawer
                    "
                    >✕</label
                >
            </div>
            <SubscriberForm />
        </div>
    </div>
</template>

<script setup lang="ts">
import SubscriberForm from "./SubscriberForm.vue"
import { inject } from "vue"
import { useSubscribersStore } from "../../store/subscribersStore"

const subscribersStore = useSubscribersStore()

const appState = inject("appState")
</script>

<style scoped></style>
