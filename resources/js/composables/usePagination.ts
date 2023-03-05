import { reactive, toRefs } from "vue"
import axios from "axios"
import pinia from "../store/store"
import { useUtilitiesStore } from "../store/utilitiesStore"

const utilitiesStore = useUtilitiesStore(pinia)
export function usePagination(url: string, perPage = 20, paginate = true) {
    const state = reactive({
        loadingData: true,
        loadNext: true,
        page: 1,
        lastPage: 1,
        totalItems: 0,
        items: [] as any[],
        abortController: new AbortController()
    })

    const getItems = (nextPage: number | boolean = true) => {
        return new Promise((resolve) => {
            state.abortController.abort()
            state.abortController = new AbortController()

            if (
                (state.loadNext && state.page - 1 !== state.lastPage) ||
                !nextPage ||
                (typeof nextPage === "number" && nextPage <= state.lastPage)
            ) {
                state.loadingData = true
                state.loadNext = false

                if (nextPage && typeof nextPage === "boolean") {
                    state.page += 1
                } else if (!nextPage && typeof nextPage === "boolean") {
                    state.page -= 1
                } else {
                    state.page = nextPage
                }

                let defaultConfig = {}
                if (paginate) {
                    defaultConfig = {
                        perPage: perPage,
                        page: state.page
                    }
                }
                axios
                    .request({
                        method: "get",
                        url,
                        params: defaultConfig,
                        signal: state.abortController.signal
                    })
                    .then(async (resp) => {
                        try {
                            if (paginate) {
                                state.totalItems = resp.data.total
                                state.items =
                                    resp.data.total === 0 ? [] : resp.data.data
                                state.lastPage = resp.data.last_page
                                state.loadNext = true

                                // Check if this is the last page
                                if (
                                    (state.page >= state.lastPage ||
                                        resp.data.total === 0) &&
                                    resp.data.total >= 0
                                ) {
                                    state.loadNext = false
                                }
                            } else {
                                state.items = resp.data
                            }

                            state.loadingData = false

                            resolve(true)
                        } catch (e) {
                            console.log(e)
                            resolve(false)
                        }
                    })
                    .catch(async (error) => {
                        if (error) {
                            console.log(error)
                            state.loadNext = true
                            state.page = 1
                            state.loadingData = false

                            utilitiesStore.message = {
                                text: error.response.data.error ?? "default",
                                error: true
                            }
                        }
                        resolve(false)
                    })
            } else {
                resolve(false)
            }
        })
    }

    return {
        ...toRefs(state),
        getItems
    }
}
