<template>
    <div
        class="flex flex-col items-center space-y-5 text-center lg:flex-row lg:space-x-10 lg:text-left"
    >
        <img
            src="../assets/home-hero.jpg"
            class="w-[90%] max-w-sm rounded-lg shadow-2xl lg:w-full"
        />
        <div>
            <h1 class="text-3xl font-bold lg:text-5xl">
                Manage your subscribers!
            </h1>
            <p class="py-6">
                If you're still writing down your subscribers into a notepad -
                STOP. Please try this tool instead!
            </p>
            <button
                class="btn btn-primary"
                @click="$router.push({ name: 'Manage Subscribers' })"
            >
                Get Started
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
//
</script>
