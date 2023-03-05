<template>
    <div ref="fieldsFormRef" class="card-body h-[calc(100vh-45px)] overflow-y-auto">
        <button class="btn btn-sm" @click="addSubField()">
            Add new field
        </button>
        <progress v-if="loadingData" class="progress h-1 w-full" />
        <ListItem />
    </div>
</template>

<script lang="ts" setup>
import { inject, onBeforeMount, provide, watch, ref } from "vue"
import ListItem from "./ListItem.vue"
import { usePagination } from "../../composables/usePagination"
import { useFieldsStore } from "../../store/fieldsStore"
import { AppStateType } from "../../types"

const appState = inject("appState") as AppStateType
const fieldsStore = useFieldsStore()

const { loadingData, items, getItems } = usePagination("/field", 5, false)

const fieldsFormRef = ref<InstanceType<typeof HTMLDivElement>>()

onBeforeMount(() => {
    getItems().then(() => {
        fieldsStore.subscriberFields = items.value
    })
})

watch(
    () => appState.fieldsDrawer,
    (newVal) => {
        if (newVal) {
            getItems().then(() => {
                fieldsStore.subscriberFields = items.value
            })
        }
    }
)

provide("subFields", items)

const addSubField = () => {
    // Only allow 1 new field
    if (items.value.length === 0 || items.value[items.value.length - 1].id) {
        items.value.push({
            title: "",
            newTitle: "",
            type: "string",
            newType: "string",
            editing: true
        })
        if (fieldsFormRef.value) {
            setTimeout(() => {
                if (fieldsFormRef.value) {
                    fieldsFormRef.value.scrollTop =
                        fieldsFormRef.value.scrollHeight
                }
            }, 50)
        }
    }
}
</script>
