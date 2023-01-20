<template>
    <div class="w-full overflow-x-auto">
        <table
            class="table w-full border-2 border-solid border-base-200 shadow-sm"
        >
            <!-- head -->
            <thead>
                <tr>
                    <th>Name / Email</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="subItem in state.subs" :key="subItem.id">
                    <td>
                        <div class="flex items-center space-x-3">
                            <div>
                                <div class="font-bold">{{ subItem.name }}</div>
                                <div class="text-sm opacity-50">
                                    {{ subItem.email }}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge-ghost badge badge-sm">{{
                            subItem.state
                        }}</span>
                    </td>
                    <th>
                        <button
                            class="btn btn-ghost btn-xs"
                            @click="subscribersStore.subToEdit = { ...subItem }"
                        >
                            Edit
                        </button>
                        <button
                            class="btn btn-error btn-xs"
                            @click="deleteSub(subItem.id)"
                        >
                            Delete
                        </button>
                    </th>
                </tr>
            </tbody>
            <!-- foot -->
            <tfoot>
                <tr>
                    <th>Name / Email</th>
                    <th>Status</th>
                    <th>
                        <div class="btn-group">
                            <button
                                class="flex items-center rounded-full rounded-r bg-primary px-4 py-2 text-white"
                                @click="prevPage()"
                            >
                                «
                            </button>
                            <div
                                class="flex items-center bg-primary text-white"
                            >
                                Page {{ state.currentPage }}/{{
                                    state.lastPage
                                }}
                            </div>
                            <button
                                class="flex items-center rounded-full rounded-l bg-primary px-4 py-2 text-white"
                                @click="nextPage()"
                            >
                                »
                            </button>
                        </div>
                    </th>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios"
import { onBeforeMount, reactive, watch } from "vue"
import { useUtilitiesStore } from "../../store/utilitiesStore"

import { SubscriberType } from "../../types"
import { useSubscribersStore } from "../../store/subscribersStore"
import { storeToRefs } from "pinia"

const utilitiesStore = useUtilitiesStore()
const subscribersStore = useSubscribersStore()

const { updateSubs } = storeToRefs(subscribersStore)

const state = reactive({
    subs: [] as SubscriberType[],
    currentPage: 1,
    lastPage: 1,
    total: 0
})

onBeforeMount(() => {
    getSubs()
})

watch(
    () => updateSubs.value,
    (newVal) => {
        if (newVal) {
            getSubs()
            subscribersStore.updateSubs = false
        }
    }
)

const prevPage = () => {
    if (state.currentPage > 1) {
        state.currentPage--
        getSubs()
    }
}

const nextPage = () => {
    if (state.currentPage < state.lastPage) {
        state.currentPage++
        getSubs()
    }
}
const getSubs = () => {
    axios
        .get("/subscribers/get/all", { params: { page: state.currentPage } })
        .then(async (resp) => {
            if (resp.data.error) {
                // TODO: Present error in a better way
                console.log(resp.data.error)
                utilitiesStore.errorMessage = resp.data.error
            } else {
                state.subs = resp.data.data
                state.currentPage = resp.data.current_page
                state.lastPage = resp.data.last_page
                state.total = resp.data.total
            }
        })
        .catch(async (e) => {
            // TODO: Do something with the error message
            console.log(e)
            utilitiesStore.errorMessage = e.response.data.error
        })
}

const deleteSub = (subID: number | undefined) => {
    axios
        .delete("/subscribers/delete", { params: { id: subID } })
        .then(async (resp) => {
            if (resp.data.error) {
                // TODO: Present error in a better way
                console.log(resp.data.error)
                utilitiesStore.errorMessage = resp.data.error
            } else {
                getSubs()
            }
        })
        .catch(async (e) => {
            // TODO: Do something with the error message
            console.log(e)
            utilitiesStore.errorMessage = e.response.data.error
        })
}
</script>
