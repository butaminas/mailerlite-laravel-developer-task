import "../../tests/mocks/axios"
import { flushPromises, shallowMount } from "@vue/test-utils"
import SubscriberList from "./SubscriberList.vue"
import { describe, expect, beforeEach, vi, it } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { subscriberList } from "../../tests/mocks/responses/subscriberResp"
import axios from "axios"

vi.spyOn(axios, "get").mockResolvedValue({ data: subscriberList })

describe("SubscriberList.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it("will properly list items in the table", async () => {
        const wrapper = shallowMount(SubscriberList, {
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

        expect(wrapper.text()).toContain("Dr. Ross Kihn")
        expect(wrapper.text()).toContain("milton54@yahoo.com")
        expect(wrapper.text()).toContain("Username: Dragonborn")
    })

    it("will show loading indicator when deleting an item", async () => {
        const wrapper = shallowMount(SubscriberList, {
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

        await wrapper.find("tr:first-child button.btn-error").trigger("click")

        expect(
            wrapper.find("tr:first-child button.btn-error").classes()
        ).toContain("loading")

        await flushPromises()

        expect(
            wrapper.find("tr:first-child button.btn-error").classes()
        ).to.not.contain("loading")
    })
})
