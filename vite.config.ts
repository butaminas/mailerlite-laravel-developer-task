/// <reference types="vitest" />
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslint from "vite-plugin-eslint"
import laravel from "laravel-vite-plugin"
import viteCompression from "vite-plugin-compression"

export default defineConfig({
    plugins: [
        eslint(),
        vue(),
        laravel({
            input: ["resources/css/app.scss", "resources/js/app.ts"],
            refresh: true
        }),
        viteCompression({
            algorithm: "brotliCompress"
        })
    ],
    test: {
        globals: true,
        environment: "happy-dom"
    }
})
