import { mount } from "@vue/test-utils"
import Pagination from "./PaginationComponent.vue"
import { describe, expect, test, it } from "vitest"
describe("PaginationComponent.vue", () => {
    test("hides pagination if only 1 page of items", () => {
        const wrapper = mount(Pagination, {
            props: {
                getItems: () => null,
                page: 1,
                lastPage: 1
            }
        })
        expect(wrapper.find("div.btn-group").exists()).toBe(false)
    })

    it("shows only forward button if more than 1 page", () => {
        const wrapper = mount(Pagination, {
            props: {
                getItems: () => null,
                page: 1,
                lastPage: 2
            }
        })
        expect(wrapper.find("div.btn-group").exists()).toBe(true)
        expect(wrapper.find("div.btn-group div.text-sm").text()).toBe(
            "Page 1/2"
        )
        expect(
            wrapper.find("div.btn-group button:first-child").classes()
        ).toEqual(expect.arrayContaining(["text-opacity-50"]))
        expect(
            wrapper.find("div.btn-group button:last-child").classes()
        ).not.toEqual(expect.arrayContaining(["text-opacity-50"]))
    })

    it("shows both buttons if page and last page is more than 1", () => {
        const wrapper = mount(Pagination, {
            props: {
                getItems: () => null,
                page: 2,
                lastPage: 3
            }
        })
        expect(
            wrapper.find("div.btn-group button:first-child").classes()
        ).not.toEqual(expect.arrayContaining(["text-opacity-50"]))
        expect(
            wrapper.find("div.btn-group button:last-child").classes()
        ).not.toEqual(expect.arrayContaining(["text-opacity-50"]))
    })
})
