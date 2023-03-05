import { reactive, toRefs } from "vue"
import axios from "axios"
import pinia from "../store/store"
import { useUtilitiesStore } from "../store/utilitiesStore"

const utilitiesStore = useUtilitiesStore(pinia)
export function useCrud(url: string) {
    const state = reactive({
        creatingItem: false,
        updatingItem: false,
        deletingItem: false
    })

    const createItem = (item: any) => {
        return new Promise<number | boolean>((resolve) => {
            if (state.creatingItem !== true) {
                state.creatingItem = true
                axios
                    .post(url, item)
                    .then((resp) => {
                        state.creatingItem = false
                        utilitiesStore.message = {
                            text: "Item created!"
                        }
                        resolve(resp.data)
                    })
                    .catch(async (error) => {
                        if (error) {
                            utilitiesStore.message = {
                                text: error.response.data.error ?? "default",
                                error: true
                            }
                        }
                        state.creatingItem = false
                        resolve(false)
                    })
            }
        })
    }
    const updateItem = (item: any) => {
        return new Promise((resolve) => {
            if (state.updatingItem !== true) {
                state.updatingItem = true
                axios
                    .patch(url + "/" + item.id, item)
                    .then(() => {
                        state.updatingItem = false
                        utilitiesStore.message = {
                            text: "Item updated!"
                        }
                        resolve(true)
                    })
                    .catch(async (error) => {
                        if (error) {
                            utilitiesStore.message = {
                                text: error.response.data.error ?? "default",
                                error: true
                            }
                        }
                        state.updatingItem = false
                        resolve(false)
                    })
            }
        })
    }

    const deleteItem = (itemID: number) => {
        return new Promise((resolve) => {
            if (state.deletingItem !== true) {
                state.deletingItem = true
                axios
                    .delete(url + "/" + itemID)
                    .then(() => {
                        state.deletingItem = false
                        resolve(true)
                    })
                    .catch(async (error) => {
                        if (error) {
                            utilitiesStore.message = {
                                text: error.response.data.error ?? "default",
                                error: true
                            }
                        }
                        state.deletingItem = false
                        resolve(false)
                    })
            }
        })
    }

    return {
        ...toRefs(state),
        createItem,
        updateItem,
        deleteItem
    }
}
