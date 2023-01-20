import { createRouter, createWebHistory } from "vue-router"
import "./axios"
import Error404 from "../views/errors/404Page.vue"
import Home from "../views/HomePage.vue"
import ManageSubscribers from "../views/subscribers/ManageSubscribers.vue"

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/manage",
            name: "Manage Subscribers",
            component: ManageSubscribers
        },
        { path: "/:catchAll(.*)", component: Error404, name: "404" }
    ]
})
