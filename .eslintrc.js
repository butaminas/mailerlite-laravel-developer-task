module.exports = {
    env: {
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-strongly-recommended",
        "plugin:vue/vue3-recommended",
        "@vue/typescript/recommended",
        "prettier",
    ],
    plugins: ["prettier"],
    rules: {
        "vue/no-unused-vars": "error",
        "no-console": "off",
        "vue/no-deprecated-slot-attribute": "off",
        semi: 0,
        "vue/v-on-event-hyphenation": 0,
        "prettier/prettier": ["warn", { trailingComma: "none", semi: false }],
        "vue/singleline-html-element-content-newline": 0,
        "@typescript-eslint/no-explicit-any": "off"
    }
}
