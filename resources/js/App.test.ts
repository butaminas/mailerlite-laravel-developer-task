import "./tests/mocks/axios"
import { flushPromises, mount } from "@vue/test-utils"
import App from "./App.vue"
import { describe, expect, vi, it, test } from "vitest"
import router from "./router"
import axios from "axios"
import { fieldsList } from "./tests/mocks/responses/fieldsResp"
describe("App.vue", () => {
    test("router works properly", async () => {
        await router.push("/")
        await router.isReady()

        const wrapper = mount(App, {
            global: {
                plugins: [router]
            }
        })
        expect(wrapper.html()).toContain("Manage your subscribers!")

        await wrapper.find("button").trigger("click")
        await flushPromises()
        expect(wrapper.html()).toContain("My subscribers")
    })

    it("should show subscribers drawer on button click", async () => {
        await router.push("/manage")
        await router.isReady()

        const wrapper = mount(App, {
            global: {
                plugins: [router],
                provide: {
                    appState: {
                        subscribersDrawer: false,
                        fieldsDrawer: false
                    }
                }
            }
        })

        expect(wrapper.find("#subscribersDrawer").exists()).toBe(false)
        await wrapper.find("button#addSubTrigger").trigger("click")
        expect(wrapper.find("#subscribersDrawer").exists()).toBe(true)
    })

    it("should show fields drawer on button click", async () => {
        vi.spyOn(axios, "get").mockResolvedValue({ data: fieldsList })

        await router.push({ name: "Manage Subscribers" })
        await router.isReady()

        const wrapper = mount(App, {
            global: {
                plugins: [router],
                provide: {
                    appState: {
                        subscribersDrawer: false,
                        fieldsDrawer: false
                    }
                }
            }
        })

        expect(wrapper.find("#fieldsDrawer").exists()).toBe(false)
        await wrapper.find("button#fieldsDrawerTrigger").trigger("click")
        expect(wrapper.find("#fieldsDrawer").exists()).toBe(true)
    })

    it("should close subscribers drawer on x click", async () => {
        await router.push("/manage")
        await router.isReady()

        const wrapper = mount(App, {
            global: {
                plugins: [router],
                provide: {
                    appState: {
                        subscribersDrawer: false,
                        fieldsDrawer: false
                    }
                }
            }
        })

        expect(wrapper.find("#subscribersDrawer").exists()).toBe(false)
        await wrapper.find("button#addSubTrigger").trigger("click")
        expect(wrapper.find("#subscribersDrawer").exists()).toBe(true)

        await wrapper.find("#closeBtn").trigger("click")
        expect(wrapper.find("#subscribersDrawer").exists()).toBe(false)
    })

    it("should close fields drawer on x click", async () => {
        await router.push("/manage")
        await router.isReady()

        const wrapper = mount(App, {
            global: {
                plugins: [router],
                provide: {
                    appState: {
                        subscribersDrawer: false,
                        fieldsDrawer: false
                    }
                }
            }
        })

        expect(wrapper.find("#fieldsDrawer").exists()).toBe(false)
        await wrapper.find("button#fieldsDrawerTrigger").trigger("click")
        expect(wrapper.find("#fieldsDrawer").exists()).toBe(true)

        await wrapper.find("#closeBtn").trigger("click")
        expect(wrapper.find("#fieldsDrawer").exists()).toBe(false)
    })
})
