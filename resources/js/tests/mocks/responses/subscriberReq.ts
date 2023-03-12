export const validSubscriber = {
    id: 1,
    name: "Test Subscriber",
    email: "email123@gmail.com",
    state: "Active",
    fields: []
}

export const validSubscriberExtraFields = {
    id: 1,
    name: "Test Subscriber",
    email: "email123@gmail.com",
    state: "Active",
    fields: [
        {
            id: 1,
            value: "Test value"
        }
    ]
}

export const invalidSubscriber = {
    name: "Test Subscriber",
    email: "",
    state: "Active",
    fields: []
}
