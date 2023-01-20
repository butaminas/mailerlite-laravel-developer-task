<template>
    <input
        id="add-field"
        v-model="state.modalOpen"
        type="checkbox"
        class="modal-toggle"
    />
    <div class="modal">
        <div class="modal-box w-[400px] max-w-5xl">
            <label
                for="add-field"
                class="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
                >✕</label
            >
            <h3 class="text-lg font-bold">Add custom fields to subscriber</h3>
            <div class="py-4">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Field title</span>
                    </label>
                    <input
                        v-model="state.newField.title"
                        type="text"
                        placeholder="Title"
                        class="input-bordered input w-full"
                    />
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Field Type</span>
                    </label>
                    <select
                        v-model="state.newField.type"
                        class="select-bordered select"
                    >
                        <option selected>String</option>
                        <option>Date</option>
                        <option>Number</option>
                        <option>Boolean</option>
                    </select>
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Value</span>
                    </label>
                    <input
                        v-if="inputType !== 'checkbox'"
                        v-model="state.newField.value"
                        :type="inputType"
                        placeholder="Enter field value"
                        class="input-bordered input max-w-full"
                    />
                    <select
                        v-else
                        v-model="state.newField.value"
                        class="select-bordered select max-w-full"
                    >
                        <option value="" disabled selected>
                            Select your option
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            <div class="modal-action justify-center">
                <button
                    :disabled="!state.newField.title || !state.newField.value"
                    class="btn btn-primary btn-block"
                    @click="
                        props.addField({ ...state.newField }),
                            (state.modalOpen = false),
                            reset()
                    "
                >
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue"

const props = defineProps({
    addField: { type: Function, required: true }
})

const state = reactive({
    modalOpen: false,
    newField: {
        title: "",
        type: "String",
        value: ""
    }
})

const inputType = computed(() => {
    switch (state.newField.type) {
        case "Number":
            return "number"
        case "Date":
            return "date"
        case "Boolean":
            return "checkbox"
        default:
            return "text"
    }
})

const reset = () => {
    state.newField = {
        title: "",
        type: "String",
        value: ""
    }
}
</script>
