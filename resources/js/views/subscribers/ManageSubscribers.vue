<template>
    <h1 class="mb-10 w-full text-center text-3xl font-bold lg:text-5xl">
        My subscribers
    </h1>
    <div
        class="flex flex-col items-center space-y-5 text-center lg:flex-row lg:space-x-10 lg:text-left"
    >
        <subscriber-list />
        <subscriber-form />
    </div>
</template>

<script setup lang="ts">
import SubscriberList from "./_SubscriberList.vue"
import SubscriberForm from "./_SubscriberForm.vue"
</script>
