<script setup lang="ts">
import { BookPreview } from "~/types";

const config = useRuntimeConfig();
const books: BookPreview[] = await $fetch("/books?sortBy=best-rating&limit=3", {
    baseURL: config.public.apiUrl,
});
</script>

<template>
    <h1>Home</h1>
    <BookPreviewBox
        :books="books"
        title="Top Books"
        link="/books?sortBy=best-rating"
    />
</template>
