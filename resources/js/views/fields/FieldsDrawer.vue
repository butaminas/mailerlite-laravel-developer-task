<template>
    <div id="fieldsDrawer" class="drawer-side">
        <label
            class="drawer-overlay"
            @click="appState.fieldsDrawer = !appState.fieldsDrawer"
        ></label>
        <div
            class="card w-80 rounded-l-none bg-base-100 shadow-lg dark:bg-base-200 lg:w-96 lg:w-96"
        >
            <div class="card-title sticky mt-4 justify-between px-8">
                <h2 class="justify-center">Subscriber Fields</h2>
                <label
                    id="closeBtn"
                    class="btn-primary btn btn-xs btn-circle self-end"
                    @click="appState.fieldsDrawer = !appState.fieldsDrawer"
                    >✕</label
                >
            </div>
            <FieldsList />
        </div>
    </div>
</template>

<script setup lang="ts">
import FieldsList from "../fields/FieldsList.vue"
import { inject } from "vue"
import { AppStateType } from "../../types"

const appState = inject("appState") as AppStateType
</script>

<style scoped></style>
