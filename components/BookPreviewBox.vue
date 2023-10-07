<script setup lang="ts">
import { BookPreview } from "~/types";

const props = defineProps<{
    books: BookPreview[];
    title: string;
    link: string;
}>();
</script>

<template>
    <div>
        <div class="book-box-head">
            <h2>{{ props.title }}</h2>
            <a :href="props.link" class="link">See more...</a>
        </div>
        <div v-for="book of props.books" class="book-preview-box">
            <BookPreview :book="book" />
        </div>
    </div>
</template>
