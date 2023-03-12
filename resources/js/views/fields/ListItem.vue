<template>
    <TransitionGroup tag="ul" name="list" class="relative">
        <div
            v-for="(field, i) in subFields"
            :key="'field' + field.id"
            class="flex w-full space-x-3 py-2"
        >
            <div class="w-full flex-grow flex-wrap self-center">
                <div v-if="field.editing" class="form-control flex space-y-2">
                    <input
                        v-model="field.newTitle"
                        type="text"
                        placeholder="Title"
                        class="input-bordered input input-xs max-w-min"
                    />
                    <select
                        v-model="field.newType"
                        class="select-bordered select select-xs w-fit capitalize"
                    >
                        <option>string</option>
                        <option>date</option>
                        <option>number</option>
                        <option>boolean</option>
                    </select>
                </div>

                <div v-else>
                    <div class="truncate">
                        {{ field.title }}
                    </div>

                    <div class="badge badge-ghost badge-sm dark:badge-info">
                        {{ field.type }}
                    </div>
                </div>
            </div>
            <div class="self-center">
                <div v-if="field.editing" class="flex flex-wrap space-y-2">
                    <button
                        id="saveFieldBtn"
                        class="btn-ghost btn-xs btn"
                        @click="saveChanges(field)"
                    >
                        <CheckIcon class="h-3 w-4" />
                        <span class="ml-1">Save</span>
                    </button>
                    <button
                        id="cancelFieldBtn"
                        class="btn-outline btn-error btn-xs btn"
                        @click="cancelEdit(i)"
                    >
                        <XMarkIcon class="h-3 w-4" />
                        <span class="ml-1">Cancel</span>
                    </button>
                </div>
                <div v-else class="flex flex-wrap space-y-2">
                    <button
                        id="editFieldBtn"
                        class="btn-ghost btn-xs btn"
                        @click="editField(field)"
                    >
                        <PencilIcon class="h-3 w-4" />
                        <span class="ml-1">Edit</span>
                    </button>
                    <button
                        id="deleteFieldBtn"
                        class="btn-outline btn-error btn-xs btn"
                        @click="deleteSubField(i)"
                    >
                        <TrashIcon class="h-3 w-4" />
                        <span class="ml-1">Delete</span>
                    </button>
                </div>
            </div>
        </div>
    </TransitionGroup>
</template>

<script lang="ts" setup>
import {
    CheckIcon,
    PencilIcon,
    TrashIcon,
    XMarkIcon
} from "@heroicons/vue/24/solid"
import { inject, Ref } from "vue"
import { SubscriberFieldType } from "../../types"
import { useCrud } from "../../composables/crudOperations"
import { useSubscribersStore } from "../../store/subscribersStore"
import { storeToRefs } from "pinia"

const subscribersStore = useSubscribersStore()
const { updateSubs } = storeToRefs(subscribersStore)

const subFields = inject("subFields") as Ref<SubscriberFieldType[]>

const { deleteItem, updateItem, createItem } = useCrud("/field")

const saveChanges = (subField: SubscriberFieldType) => {
    if (subField.newTitle && subField.newType) {
        subField.title = subField.newTitle
        subField.type = subField.newType
    }
    if (subField.id) {
        updateItem(subField)
        subField.editing = false
        updateSubs.value = true
    } else {
        createItem(subField).then((newID) => {
            if (newID) {
                subField.id = newID
                subField.editing = false
            }
        })
    }
}

const editField = (subField: SubscriberFieldType) => {
    subField.newTitle = subField.title
    subField.newType = subField.type
    subField.editing = true
}

const cancelEdit = (i: number) => {
    if (subFields.value[i].id) {
        subFields.value[i].editing = false
    } else {
        subFields.value.splice(i, 1)
    }
}
const deleteSubField = (i: number) => {
    if (subFields.value[i].id) {
        deleteItem(subFields.value[i].id as number)
        updateSubs.value = true
    }
    subFields.value.splice(i, 1)
}
</script>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>
