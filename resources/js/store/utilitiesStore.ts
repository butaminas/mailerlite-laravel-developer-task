import { defineStore } from "pinia"

export const useUtilitiesStore = defineStore("UtilitiesStore", {
    status: () => ({
        message: null as null | { text: string; error?: boolean }
    })
})
