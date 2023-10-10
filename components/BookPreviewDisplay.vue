<script setup lang="ts">
import { Book } from "~/types";

const props = defineProps<{
    books: Book[];
    title: string;
    link: string;
}>();
</script>

<template>
    <div>
        <div class="book-display-head">
            <h2>{{ props.title }}</h2>
            <a :href="props.link" class="link">See more...</a>
        </div>
        <BookPreview v-for="book of props.books" :book="book" />
    </div>
</template>

<style scoped>
.book-display-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
</style>
