interface SubscriberType {
    id?: number
    name: string
    email: string
    state: string
    fields?: SubscriberFieldType[]
}

interface SubscriberFieldType {
    title: string
    type: string
    value: string
}

export type { SubscriberType, SubscriberFieldType }
