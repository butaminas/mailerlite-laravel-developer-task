<template>
    <div
        class="card border-2 border-solid border-base-200 bg-base-100 shadow-sm dark:bg-base-200 lg:w-2/3"
    >
        <div class="card-body">
            <h2 class="card-title">
                {{
                    !subscribersStore.subToEdit
                        ? "Add new subscriber"
                        : "Editing subscriber"
                }}
            </h2>

            <!-- input fields -->
            <input
                v-model="state.subscriber.name"
                type="text"
                placeholder="Name"
                class="input-bordered input w-full"
            />
            <input
                v-model="state.subscriber.email"
                type="email"
                placeholder="Email address"
                class="input-bordered input w-full"
            />

            <div class="form-control w-full">
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
            </div>

            <div
                v-for="(field, i) in state.subscriber.fields"
                :key="i"
                class="form-control"
            >
                <label class="label">
                    <span class="label-text">{{ field.title }}</span>
                </label>
                <div class="input-group">
                    <input
                        v-if="inputType(i) !== 'checkbox'"
                        v-model="state.subscriber.fields[i].value"
                        :type="inputType(i)"
                        placeholder="Enter field value"
                        class="input-bordered input w-full"
                    />
                    <select
                        v-else
                        v-model="state.subscriber.fields[i].value"
                        class="select-bordered select"
                    >
                        <option value="" disabled selected>
                            Select your option
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <button
                        class="btn btn-error btn-square"
                        @click="state.subscriber.fields?.splice(i, 1)"
                    >
                        -
                    </button>
                </div>
            </div>

            <label for="add-field" class="btn btn-link">+Add more fields</label>

            <add-new-field :add-field="addField" />

            <!-- end input fields -->
            <div class="card-actions justify-center lg:justify-start">
                <button
                    class="btn btn-primary btn-block"
                    :class="{ loading: state.loading }"
                    @click="createUpdate()"
                >
                    <span v-if="state.loading">Loading...</span>
                    <span v-else>{{
                        !subscribersStore.subToEdit ? "Create" : "Update"
                    }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios"
import AddNewField from "./_AddNewField.vue"
import { reactive, watch } from "vue"
import { useUtilitiesStore } from "../../store/utilitiesStore"
import { useSubscribersStore } from "../../store/subscribersStore"
import { storeToRefs } from "pinia"

const utilitiesStore = useUtilitiesStore()
const subscribersStore = useSubscribersStore()

const { subToEdit } = storeToRefs(subscribersStore)

interface SubscriberType {
    id?: number
    name: string
    email: string
    state: string
    fields: SubscriberFieldType[]
}

interface SubscriberFieldType {
    title: string
    type: string
    value: string
}

const state = reactive({
    loading: false,
    subscriber: {
        name: "",
        email: "",
        state: "Select state",
        fields: []
    } as SubscriberType
})

watch(
    () => subToEdit.value,
    (newVal) => {
        if (newVal) {
            state.subscriber = subToEdit.value as SubscriberType
        }
    }
)

const inputType = (index: number) => {
    switch (state.subscriber?.fields?.[index]?.type) {
        case "Number":
            return "number"
        case "Date":
            return "date"
        case "Boolean":
            return "checkbox"
        default:
            return "text"
    }
}

const addField = (field: SubscriberFieldType) => {
    state.subscriber.fields?.push(field)
}

const createUpdate = () => {
    state.loading = true
    axios
        .post("/subscribers/upsert", state.subscriber)
        .then(async (resp) => {
            if (resp.data.error) {
                // TODO: Present error in a better way
                console.log(resp.data.error)
                utilitiesStore.errorMessage = resp.data.error
            } else {
                state.subscriber = {
                    name: "",
                    email: "",
                    state: "Select state",
                    fields: []
                }
                subscribersStore.subToEdit = null
                subscribersStore.updateSubs = true
            }
            state.loading = false
        })
        .catch(async (e) => {
            // TODO: Do something with the error message
            console.log(e)
            state.loading = false
            utilitiesStore.errorMessage = e.response.data.error
        })
}
</script>
