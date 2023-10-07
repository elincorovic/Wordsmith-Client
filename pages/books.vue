<script setup lang="ts">
import { BookPreview } from "~/types";

const config = useRuntimeConfig();
const queryParams = useRoute().query;

console.log(queryParams);

const books: BookPreview[] = await $fetch(`/books`, {
    baseURL: config.public.apiUrl,
});
</script>

<template>
    <h1>Books</h1>
    <div class="books-container">
        <BookPreview v-for="book of books" :book="book" />
    </div>
</template>

<style scoped>
.books-container {
    display: grid;
    grid-template-columns: 100%;
}
</style>
