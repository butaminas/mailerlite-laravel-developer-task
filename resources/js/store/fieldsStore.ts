import { defineStore } from "pinia"
import { SubscriberFieldType } from "../types"

export const useFieldsStore = defineStore("FieldsStore", {
    state: () => ({
        subscriberFields: [] as SubscriberFieldType[]
    }),
    getters: {
        // Get readonly version of subscriberFields
        getSubscriberFields: (state) => state.subscriberFields
    }
})
