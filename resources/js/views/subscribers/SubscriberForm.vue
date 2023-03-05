<template>
    <div class="card-body h-[calc(100vh-45px)] overflow-y-auto">
        <div class="form-control w-full">
            <label class="label">
                <span class="label-text">Name</span>
            </label>
            <input
                v-model="state.subscriber.name"
                type="text"
                placeholder="Name"
                class="input-bordered input w-full"
            />
            <label class="label">
                <span class="label-text">Email</span>
            </label>
            <input
                v-model="state.subscriber.email"
                type="email"
                placeholder="Email address"
                class="input-bordered input w-full"
            />
            <label class="label">
                <span class="label-text">State</span>
            </label>
            <select
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
                    placeholder="Enter field value"
                    class="input-bordered input w-full"
                />
                <select
                    v-else
                    v-model="field.value"
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
                class="btn btn-primary btn-block"
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
import { inject, reactive, watch } from "vue"
import { useSubscribersStore } from "../../store/subscribersStore"
import { storeToRefs } from "pinia"
import { AppStateType, SubscriberType } from "../../types"
import { useFieldsStore } from "../../store/fieldsStore"
import { useCrud } from "../../composables/crudOperations"

const subscribersStore = useSubscribersStore()
const fieldsStore = useFieldsStore()

const { subToEdit } = storeToRefs(subscribersStore)
const { subscriberFields } = storeToRefs(fieldsStore)

const { updateItem, updatingItem, createItem, creatingItem } =
    useCrud("/subscriber")

const appState = inject("appState") as AppStateType

const state = reactive({
    subscriber: {
        name: "",
        email: "",
        state: "Select state",
        fields: []
    } as SubscriberType
})

watch(
    () => subscriberFields.value,
    (newVal) => {
        state.subscriber.fields = newVal
    }
)

watch(
    () => subToEdit.value,
    (newVal) => {
        state.subscriber.fields = subscriberFields.value
        if (newVal) {
            state.subscriber.id = newVal.id
            state.subscriber.name = newVal.name
            state.subscriber.email = newVal.email
            state.subscriber.state = newVal.state

            if (state.subscriber.fields && state.subscriber.fields.length > 0) {
                state.subscriber.fields.map((e) => {
                    e.value =
                        newVal?.fields?.find((f) => f.field_id === e.id)
                            ?.value ?? ""
                    return e
                })
            }
        }
    }
)

watch(
    () => appState.subscribersDrawer,
    (newVal) => {
        if (!newVal) {
            setTimeout(() => {
                resetForm()
            }, 300)
        } else {
            state.subscriber.fields = subscriberFields.value
        }
    }
)

const saveChanges = () => {
    if (state.subscriber.id) {
        updateItem(state.subscriber).then((updated) => {
            if (updated) {
                subscribersStore.updateSubs = true
                console.log(subscriberFields.value)
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

const inputType = (type: string) => {
    switch (type.toLowerCase()) {
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
