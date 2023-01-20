import { defineStore } from "pinia"

export const useUtilitiesStore = defineStore("UtilitiesStore", {
    state: () => ({
        errorMessage: null as string | null
    }),
    actions: {
        async showToast(text: string, duration = 4000) {
            setTimeout(() => {
                this.errorMessage = null
            }, duration)
        }
    }
})
