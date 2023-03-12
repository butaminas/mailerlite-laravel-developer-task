import { shallowMount } from "@vue/test-utils"
import ManageSubscribers from "./ManageSubscribers.vue"
import { describe, expect, it } from "vitest"
describe("ManageSubscribers.vue", () => {
    it("should show subscribers drawer on button click", async () => {
        const wrapper = shallowMount(ManageSubscribers, {
            global: {
                provide: {
                    appState: {
                        subscribersDrawer: false,
                        fieldsDrawer: false
                    }
                }
            }
        })
        expect(
            wrapper.getCurrentComponent().appContext.provides.appState
                .subscribersDrawer
        ).toBe(false)
        await wrapper.find("button").trigger("click")
        expect(
            wrapper.getCurrentComponent().appContext.provides.appState
                .subscribersDrawer
        ).toBe(true)
    })
})
