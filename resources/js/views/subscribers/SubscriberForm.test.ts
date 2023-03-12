import "../../tests/mocks/axios"
import { flushPromises, shallowMount } from "@vue/test-utils"
import SubscriberForm from "./SubscriberForm.vue"
import { describe, expect, beforeEach, vi, it } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useSubscribersStore } from "../../store/subscribersStore"
import { singleSubscriber } from "../../tests/mocks/responses/subscriberResp"
import axios from "axios"
import { nextTick } from "vue"
import { fieldsList } from "../../tests/mocks/responses/fieldsResp"

describe("SubscriberForm.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it("will trigger subscribers update on creation", async () => {
        vi.spyOn(axios, "post").mockResolvedValue({ data: true })
        const subscribersStore = useSubscribersStore()

        const wrapper = shallowMount(SubscriberForm, {
            global: {
                provide: {
                    appState: {
                        subscribersDrawer: true,
                        fieldsDrawer: false
                    }
                }
            }
        })

        expect(subscribersStore.updateSubs).toBe(false)

        await wrapper.find("button.btn-block").trigger("click")
        await nextTick()

        expect(subscribersStore.updateSubs).toBe(true)
    })
    it("will not trigger subscribers update on error", async () => {
        vi.spyOn(axios, "post").mockRejectedValue({
            response: {
                data: { error: true }
            }
        })
        const subscribersStore = useSubscribersStore()

        const wrapper = shallowMount(SubscriberForm, {
            global: {
                provide: {
                    appState: {
                        subscribersDrawer: true,
                        fieldsDrawer: false
                    }
                }
            }
        })

        expect(subscribersStore.updateSubs).toBe(false)

        await wrapper.find("button.btn-block").trigger("click")
        await nextTick()

        expect(subscribersStore.updateSubs).toBe(false)
    })
    it("it will properly load subscriber edit with fields", async () => {
        vi.spyOn(axios, "get").mockResolvedValue({ data: fieldsList })

        const subscribersStore = useSubscribersStore()
        subscribersStore.subToEdit = singleSubscriber

        const wrapper = shallowMount(SubscriberForm, {
            global: {
                provide: {
                    appState: {
                        subscribersDrawer: true,
                        fieldsDrawer: false
                    }
                }
            }
        })

        await flushPromises()

        const customFieldValue = singleSubscriber.fields
            ? singleSubscriber.fields[0].value
            : undefined

        expect(
            (
                wrapper.find("input[placeholder='Name']")
                    .element as HTMLInputElement
            ).value
        ).toBe(singleSubscriber.name)
        expect(
            (
                wrapper.find("input[placeholder='Email address']")
                    .element as HTMLInputElement
            ).value
        ).toBe(singleSubscriber.email)
        expect(
            (
                wrapper.find("select#selectState]")
                    .element as unknown as HTMLSelectElement
            ).value
        ).toBe(singleSubscriber.state)

        expect(singleSubscriber.fields).toBeDefined()
        expect(
            (
                wrapper.find("input[name='Username']")
                    .element as unknown as HTMLSelectElement
            ).value
        ).toBe(customFieldValue)
    })
    it("it will clear the form after successfully creating a subscriber", async () => {
        vi.spyOn(axios, "post").mockResolvedValue({ data: true })

        const wrapper = shallowMount(SubscriberForm, {
            global: {
                provide: {
                    appState: {
                        subscribersDrawer: true,
                        fieldsDrawer: false
                    }
                }
            }
        })

        await wrapper
            .find("input[placeholder='Name']")
            .setValue(singleSubscriber.name)
        await wrapper
            .find("input[placeholder='Email address']")
            .setValue(singleSubscriber.email)
        await wrapper
            .find("select#selectState")
            .setValue(singleSubscriber.state)

        expect((wrapper.vm as any).state.subscriber.name).toBe(
            singleSubscriber.name
        )
        expect((wrapper.vm as any).state.subscriber.email).toBe(
            singleSubscriber.email
        )
        expect((wrapper.vm as any).state.subscriber.state).toBe(
            singleSubscriber.state
        )

        await wrapper.find("button.btn-block").trigger("click")
        await nextTick()
    })
})
