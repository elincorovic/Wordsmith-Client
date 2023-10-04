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
        <div class="book-box-head">
            <h2>Top Books</h2>
            <a href="#" class="link">See more...</a>
        </div>
        <div v-for="book of books" class="book-box">
            <img
                class="book-box-img"
                :src="config.public.apiUrl + `/books/images/${book.slug}.jpeg`"
                :alt="book.title"
            />
            <div>
                <h3>{{ book.title }}</h3>
                <p>
                    by <a href="#" class="link">{{ book.author }}</a>
                </p>
                <p>{{ book.ratings.avg }} / 5</p>
            </div>
        </div>
    </div>
</template>
