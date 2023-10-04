<script setup lang="ts">
import { Book } from "~/types";

const config = useRuntimeConfig();
const books: Book[] = await $fetch("/books?sortBy=best-rating&limit=3", {
    baseURL: config.public.apiUrl,
});
</script>

<template>
    <div>
        <h1>Home</h1>
    </div>
    <BookBox :books="books" title="Top Books" />
</template>
