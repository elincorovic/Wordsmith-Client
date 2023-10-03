<script setup lang="ts">
import { Book } from "~/types";

const config = useRuntimeConfig();
const books: Book[] = await $fetch("/books", {
    baseURL: config.public.apiUrl,
});
</script>

<template>
    <div>
        <h1>Home</h1>
    </div>
    <div v-if="books">
        <div v-for="book of books">
            <img
                :src="config.public.apiUrl + `/books/images/${book.slug}.jpeg`"
                :alt="book.title"
            />
            <h3>{{ book.title }}</h3>
        </div>
    </div>
</template>
