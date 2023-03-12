import { vi } from "vitest"

vi.mock("axios", () => ({
    default: {
        defaults: { baseURL: "" },
        interceptors: {
            request: { use: vi.fn(), eject: vi.fn() },
            response: { use: vi.fn(), eject: vi.fn() }
        },
        get: vi.fn((route) => {
            return Promise.resolve({ route: route, data: [] })
        }),
        post: vi.fn((route, data) => {
            return Promise.resolve({ route: route, data: data })
        }),
        patch: vi.fn((route, data) => {
            return Promise.resolve({ route: route, data: data })
        }),
        delete: vi.fn((route) => {
            return Promise.resolve({ route: route, data: [] })
        })
    }
}))
