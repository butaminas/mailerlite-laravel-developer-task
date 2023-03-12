import { SubscriberType } from "../../../types"

export const singleSubscriber: SubscriberType = {
    id: 1,
    name: "Dr. Ross Kihn",
    email: "milton54@yahoo.com",
    state: "Unconfirmed",
    fields: [
        {
            field_id: 1,
            value: "Dragonborn",
            title: "Username"
        }
    ]
}

export const subscriberList = {
    current_page: 1,
    data: [
        {
            id: 1,
            name: "Dr. Ross Kihn",
            email: "milton54@yahoo.com",
            state: "Unconfirmed",
            fields: [
                {
                    field_id: 1,
                    value: "Dragonborn",
                    title: "Username"
                }
            ]
        },
        {
            id: 2,
            name: "Emilia Boyle",
            email: "talon.padberg@gmail.com",
            state: "Unconfirmed",
            fields: []
        },
        {
            id: 3,
            name: "Ezra Ankunding",
            email: "karson91@gmail.com",
            state: "Unconfirmed",
            fields: []
        },
        {
            id: 4,
            name: "Camylle Hodkiewicz",
            email: "rwiza@hotmail.com",
            state: "Unconfirmed",
            fields: []
        },
        {
            id: 5,
            name: "Thad Bergnaum",
            email: "estel.becker@yahoo.com",
            state: "Unconfirmed",
            fields: []
        }
    ],
    first_page_url: "http://127.0.0.1:8000/api/subscriber?page=1",
    from: 1,
    last_page: 2,
    last_page_url: "http://127.0.0.1:8000/api/subscriber?page=2",
    links: [
        {
            url: null,
            label: "&laquo; Previous",
            active: false
        },
        {
            url: "http://127.0.0.1:8000/api/subscriber?page=1",
            label: "1",
            active: true
        },
        {
            url: "http://127.0.0.1:8000/api/subscriber?page=2",
            label: "2",
            active: false
        },
        {
            url: "http://127.0.0.1:8000/api/subscriber?page=2",
            label: "Next &raquo;",
            active: false
        }
    ],
    next_page_url: "http://127.0.0.1:8000/api/subscriber?page=2",
    path: "http://127.0.0.1:8000/api/subscriber",
    per_page: 5,
    prev_page_url: null,
    to: 5,
    total: 6
}
