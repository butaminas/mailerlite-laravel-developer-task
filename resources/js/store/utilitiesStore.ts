import { defineStore } from "pinia"

export const useUtilitiesStore = defineStore("UtilitiesStore", {
    state: () => ({
        message: null as null | { text: string; error?: boolean }
    })
})
