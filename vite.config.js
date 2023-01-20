import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslint from "vite-plugin-eslint"
import VueTypeImports from "vite-plugin-vue-type-imports"
import laravel from "laravel-vite-plugin"

export default defineConfig({
    plugins: [
        eslint(),
        VueTypeImports(),
        vue(),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.ts"],
            refresh: true
        })
    ]
})
