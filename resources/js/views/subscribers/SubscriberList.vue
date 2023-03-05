<template>
    <div class="w-full overflow-x-auto">
        <table
            class="table w-full border-2 border-solid border-base-200 shadow-sm"
        >
            <progress v-if="loadingData" class="progress h-1 w-full absolute top-0 left-0" />
            <!-- head -->
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Other</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="subItem in items" :key="subItem.id">
                    <td>{{ subItem.name }}</td>
                    <td>{{ subItem.email }}</td>
                    <td>
                        <div
                            class="flex flex-wrap items-center text-sm opacity-50"
                        >
                            <div
                                class="w-full"
                                v-for="field in subItem.fields"
                                :key="field.id"
                            >
                                <b>{{ field.title }}:</b> {{ field.value }}
                            </div>
                            <div v-if="subItem.fields.length === 0">N/A</div>
                        </div>
                    </td>
                    <td>
                        <span
                            class="badge badge-ghost badge-sm dark:badge-info"
                            >{{ subItem.state }}</span
                        >
                    </td>
                    <th class="space-x-3">
                        <button
                            class="btn btn-ghost btn-primary btn-xs"
                            :disabled="state.deletingItems.includes(subItem.id)"
                            @click="
                                ;(subscribersStore.subToEdit = { ...subItem }),
                                    (appState.subscribersDrawer = true)
                            "
                        >
                            <PencilIcon class="h-3 w-4" />
                            <span class="ml-1">Edit</span>
                        </button>
                        <button
                            class="btn-error btn btn-outline btn-xs"
                            :class="{
                                loading: state.deletingItems.includes(
                                    subItem.id
                                )
                            }"
                            :disabled="state.deletingItems.includes(subItem.id)"
                            @click="deleteSub(subItem.id)"
                        >
                            <span
                                v-if="state.deletingItems.includes(subItem.id)"
                                >Deleting...</span
                            >
                            <span v-else class="flex">
                                <TrashIcon class="h-3 w-4" />
                                <span class="ml-1">Delete</span>
                            </span>
                        </button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="flex w-full">
        <div class="flex-grow">
            <button
                class="drawer-button btn btn-primary btn-outline btn-sm"
                @click="appState.fieldsDrawer = !appState.fieldsDrawer"
            >
                Manage Fields
            </button>
        </div>
        <div class="flex-none gap-1">
            <PaginationComponent
                :get-items="getItems"
                :page="page"
                :last-page="lastPage"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, watch } from "vue"
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid"
import { usePagination } from "../../composables/usePagination"
import PaginationComponent from "../../components/PaginationComponent.vue"

import { useSubscribersStore } from "../../store/subscribersStore"
import { inject } from "vue"
import { storeToRefs } from "pinia"
import { useCrud } from "../../composables/crudOperations"

const subscribersStore = useSubscribersStore()
const { updateSubs } = storeToRefs(subscribersStore)

const { page, lastPage, loadingData, items, getItems } = usePagination(
    "/subscriber",
    5
)
const { deleteItem } = useCrud("/subscriber")

const appState = inject("appState")
const state = reactive({
    deletingItems: [] as number[]
})

watch(
    () => updateSubs.value,
    (newVal) => {
        if (newVal) {
            getItems(1).then(() => {
                updateSubs.value = false
            })
        }
    }
)

onBeforeMount(() => {
    getItems(1)
})

const deleteSub = (subID: number) => {
    state.deletingItems.push(subID)
    deleteItem(subID).then(() => {
        getItems(1)
        state.deletingItems = state.deletingItems.filter((e) => e !== subID)
    })
}
</script>
