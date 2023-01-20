import { defineStore } from "pinia"
import { SubscriberType } from "../types"

export const useSubscribersStore = defineStore("SubscribersStore", {
    state: () => ({
        subToEdit: null as SubscriberType | null,
        updateSubs: false
    })
})
