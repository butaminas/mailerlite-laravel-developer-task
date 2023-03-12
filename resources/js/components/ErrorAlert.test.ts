import { mount } from "@vue/test-utils"
import Notification from "./ErrorAlert.vue"
import { describe, expect, test, beforeEach, vi } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useUtilitiesStore } from "../store/utilitiesStore"
import { nextTick } from "vue"

describe("ErrorAlert.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    test("renders the correct style for error", () => {
        const utilitiesStore = useUtilitiesStore()
        utilitiesStore.message = {
            text: "Test",
            error: true
        }

        const wrapper = mount(Notification)
        expect(wrapper.find("div.alert.alert-error").exists()).toBe(true)
    })
    test("renders the correct style for success", () => {
        const utilitiesStore = useUtilitiesStore()
        utilitiesStore.message = {
            text: "Test",
            error: false
        }

        const wrapper = mount(Notification)
        expect(wrapper.find("div.alert.alert-success").exists()).toBe(true)
    })

    test("dismiss notification when close button is clicked", async () => {
        const utilitiesStore = useUtilitiesStore()
        utilitiesStore.message = {
            text: "Test",
            error: false
        }

        const wrapper = mount(Notification)
        await wrapper.find("button.btn-link").trigger("click")
        expect(wrapper.find("div.alert").exists()).toBe(false)
    })

    test("dismiss notification after 10sec.", async () => {
        vi.useFakeTimers()
        const utilitiesStore = useUtilitiesStore()
        const wrapper = mount(Notification)

        utilitiesStore.message = {
            text: "Test",
            error: false
        }

        await nextTick()

        expect(wrapper.find("div.alert").exists()).toBe(true)
        setTimeout(async () => {
            await nextTick()
            expect(wrapper.find("div.alert").exists()).toBe(false)
        }, 10000)
        vi.runAllTimers()
    })
})
