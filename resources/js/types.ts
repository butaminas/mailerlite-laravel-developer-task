interface SubscriberType {
    id?: number | boolean
    name: string
    email: string
    state: string
    fields?: SubscriberFieldType[]
}

interface SubscriberFieldType {
    id?: number | boolean
    field_id?: number
    title: string
    newTitle?: string
    type?: string
    newType?: string
    editing?: boolean
    value?: string
}

interface AppStateType {
    fieldsDrawer: boolean
    subscribersDrawer: boolean
}

export type { SubscriberType, SubscriberFieldType, AppStateType }
