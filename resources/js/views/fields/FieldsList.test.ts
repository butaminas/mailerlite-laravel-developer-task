import "../../tests/mocks/axios"
import { flushPromises, mount } from "@vue/test-utils"
import FieldsList from "./FieldsList.vue"
import { describe, expect, beforeEach, vi, it } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { subscriberList } from "../../tests/mocks/responses/subscriberResp"
import axios from "axios"
import { fieldsList } from "../../tests/mocks/responses/fieldsResp"

vi.spyOn(axios, "get").mockResolvedValue({ data: subscriberList })

describe("FieldsList.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it("will properly load fields into the list", async () => {
        vi.spyOn(axios, "get").mockResolvedValue({ data: fieldsList })

        const wrapper = mount(FieldsList, {
            global: {
                provide: {
                    appState: {
                        subscribersDrawer: false,
                        fieldsDrawer: false
                    }
                }
            }
        })

        await flushPromises()

        expect(wrapper.text()).toContain("Username")
        expect(wrapper.text()).toContain("Birthday")
        expect(wrapper.text()).toContain("VIP")
        expect(wrapper.text()).toContain("Gifts")
    })

    it("will add a new field to the list", async () => {
        vi.spyOn(axios, "get").mockResolvedValue({ data: fieldsList })
        vi.spyOn(axios, "post").mockResolvedValue({ data: true })

        const wrapper = mount(FieldsList, {
            global: {
                provide: {
                    appState: {
                        subscribersDrawer: false,
                        fieldsDrawer: false
                    }
                }
            }
        })

        await flushPromises()

        await wrapper.find("#addNewField").trigger("click")

        const newField = wrapper.find("input[placeholder='Title']")
        expect(newField.exists()).toBe(true)

        await newField.setValue("New field test")
        await wrapper.find("#saveFieldBtn").trigger("click")

        await flushPromises()

        expect(wrapper.find("input[placeholder='Title']").exists()).toBe(false)
        expect(wrapper.text()).toContain("New field test")
    })

    it("will edit an existing field", async () => {
        vi.spyOn(axios, "get").mockResolvedValue({ data: fieldsList })
        vi.spyOn(axios, "patch").mockResolvedValue({ data: true })

        const wrapper = mount(FieldsList, {
            global: {
                provide: {
                    appState: {
                        subscribersDrawer: false,
                        fieldsDrawer: false
                    }
                }
            }
        })

        await flushPromises()

        expect(wrapper.text()).toContain("Username")

        await wrapper.find("#editFieldBtn").trigger("click")

        const newField = wrapper.find("input[placeholder='Title']")
        expect(newField.exists()).toBe(true)

        await newField.setValue("UsernameUpdated")
        await wrapper.find("#saveFieldBtn").trigger("click")

        expect(wrapper.find("input[placeholder='Title']").exists()).toBe(false)
        expect(wrapper.text()).toContain("UsernameUpdated")
    })

    it("will delete an existing field", async () => {
        vi.spyOn(axios, "get").mockResolvedValue({ data: fieldsList })
        vi.spyOn(axios, "delete").mockResolvedValue({ data: true })

        const wrapper = mount(FieldsList, {
            global: {
                provide: {
                    appState: {
                        subscribersDrawer: false,
                        fieldsDrawer: false
                    }
                }
            }
        })

        await flushPromises()

        expect(wrapper.text()).toContain("Username")
        await wrapper.find("#deleteFieldBtn").trigger("click")

        expect(wrapper.text()).not.contain("Username")
    })
})
