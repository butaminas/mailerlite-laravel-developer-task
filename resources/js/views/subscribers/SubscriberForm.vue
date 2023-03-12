<template>
    <div class="card-body h-[calc(100vh-45px)] overflow-y-auto">
        <div class="form-control w-full">
            <label class="label">
                <span class="label-text">Name</span>
            </label>
            <input
                v-model="state.subscriber.name"
                type="text"
                maxlength="255"
                placeholder="Name"
                class="input-bordered input w-full"
            />
            <label class="label">
                <span class="label-text">Email</span>
            </label>
            <input
                v-model="state.subscriber.email"
                type="email"
                maxlength="255"
                placeholder="Email address"
                class="input-bordered input w-full"
            />
            <label class="label">
                <span class="label-text">State</span>
            </label>
            <select
                id="selectState"
                v-model="state.subscriber.state"
                class="select-bordered select"
            >
                <option disabled selected>Select state</option>
                <option>Active</option>
                <option>Unsubscribed</option>
                <option>Junk</option>
                <option>Bounced</option>
                <option>Unconfirmed</option>
            </select>
            <div v-for="(field, i) in state.subscriber.fields" :key="i">
                <label class="label">
                    <span class="label-text">{{ field.title }}</span>
                </label>
                <input
                    v-if="inputType(field.type) !== 'checkbox'"
                    v-model="field.value"
                    :type="inputType(field.type)"
                    maxlength="255"
                    :name="field.title"
                    placeholder="Enter field value"
                    class="input-bordered input w-full"
                />
                <select
                    v-else
                    v-model="field.value"
                    :name="field.title"
                    class="select-bordered select w-full"
                >
                    <option value="" disabled selected>
                        Select your option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
        </div>

        <!-- end input fields -->
        <div class="card-actions mt-4 justify-center lg:justify-start">
            <button
                class="btn-primary btn btn-block"
                :disabled="creatingItem || updatingItem"
                :class="{ loading: creatingItem || updatingItem }"
                @click="saveChanges()"
            >
                <span v-if="creatingItem || updatingItem">Loading...</span>
                <span v-else>{{
                    !subscribersStore.subToEdit ? "Create" : "Update"
                }}</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, reactive } from "vue"
import { useSubscribersStore } from "../../store/subscribersStore"
import { storeToRefs } from "pinia"
import { SubscriberType } from "../../types"
import { useFieldsStore } from "../../store/fieldsStore"
import { useCrud } from "../../composables/crudOperations"
import { usePagination } from "../../composables/usePagination"

const subscribersStore = useSubscribersStore()
const fieldsStore = useFieldsStore()

const { subToEdit } = storeToRefs(subscribersStore)
const { subscriberFields } = storeToRefs(fieldsStore)

const { updateItem, updatingItem, createItem, creatingItem } =
    useCrud("/subscriber")

const { items, getItems } = usePagination("/field", undefined, false)

const state = reactive({
    subscriber: {
        name: "",
        email: "",
        state: "Select state",
        fields: []
    } as SubscriberType
})

onBeforeMount(async () => {
    if (subscriberFields.value.length === 0) {
        await getItems()
        subscriberFields.value = items.value
    }
    state.subscriber.fields = subscriberFields.value
    addSubToEdit()
})

onBeforeUnmount(() => {
    resetForm()
})

const addSubToEdit = () => {
    if (subToEdit.value) {
        state.subscriber.id = subToEdit.value.id
        state.subscriber.name = subToEdit.value.name
        state.subscriber.email = subToEdit.value.email
        state.subscriber.state = subToEdit.value.state

        if (state.subscriber.fields && state.subscriber.fields.length > 0) {
            state.subscriber.fields.map((e) => {
                e.value =
                    subToEdit.value?.fields?.find((f) => f.field_id === e.id)
                        ?.value ?? ""
                return e
            })
        }
    }
}

const saveChanges = () => {
    if (state.subscriber.id) {
        updateItem(state.subscriber).then((updated) => {
            if (updated) {
                subscribersStore.updateSubs = true
            }
        })
    } else {
        createItem(state.subscriber).then((created) => {
            if (created) {
                resetForm()
                subscribersStore.updateSubs = true
            }
        })
    }
}

const resetForm = () => {
    state.subscriber.id = false
    state.subscriber.name = ""
    state.subscriber.email = ""
    state.subscriber.state = "Select state"
    state.subscriber.fields = subscriberFields.value
    subToEdit.value = null
}

const inputType = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
        case "number":
            return "number"
        case "date":
            return "date"
        case "boolean":
            return "checkbox"
        default:
            return "text"
    }
}
</script>

<style></style>
