<template>
    <div class="w-full overflow-x-auto">
        <table
            class="table w-full border-2 border-solid border-base-200 shadow-sm"
        >
            <progress
                v-if="loadingData"
                class="progress absolute top-0 left-0 h-1 w-full"
            />
            <!-- head -->
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Other</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loadingData">
                    <td>Loading data...</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-for="subItem in items" :key="subItem.id">
                    <td>{{ subItem.name }}</td>
                    <td>{{ subItem.email }}</td>
                    <td>
                        <div
                            class="flex flex-wrap items-center text-sm opacity-50"
                        >
                            <div
                                v-for="field in subItem.fields"
                                :key="field.id"
                                class="w-full"
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
                            class="btn-primary btn-ghost btn btn-xs"
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
                            class="btn-error btn-outline btn btn-xs"
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
                id="fieldsDrawerTrigger"
                class="drawer-button btn-primary btn-outline btn btn-sm"
                @click="appState.fieldsDrawer = !appState.fieldsDrawer"
            >
                Manage Fields
            </button>
        </div>
        <div class="flex-none gap-1">
            <PaginationComponent
                v-if="lastPage > 0"
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
import { AppStateType } from "../../types"

const subscribersStore = useSubscribersStore()
const { updateSubs } = storeToRefs(subscribersStore)

const { page, lastPage, loadingData, items, getItems } = usePagination(
    "/subscriber",
    5
)
const { deleteItem } = useCrud("/subscriber")

const appState = inject("appState") as AppStateType
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
