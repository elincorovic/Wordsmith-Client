<script setup lang="ts">
import { BookPreview } from "~/types";

const props = defineProps<{
    book: BookPreview;
}>();

const config = useRuntimeConfig();
</script>

<template>
    <img
        class="book-box-img"
        :src="config.public.apiUrl + `/books/images/${props.book.slug}.jpeg`"
        :alt="props.book.title"
    />
    <div>
        <h3>{{ props.book.title }}</h3>
        <p>
            by
            <a :href="'/books?author=' + props.book.author" class="link">{{
                props.book.author
            }}</a>
        </p>
        <p>{{ props.book.avgRating }} / 5</p>
    </div>
</template>
