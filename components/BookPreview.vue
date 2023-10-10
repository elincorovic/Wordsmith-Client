<script setup lang="ts">
import { Book } from "~/types";

const router = useRouter();
const props = defineProps<{
    book: Book;
}>();

const config = useRuntimeConfig();
</script>

<template>
    <div class="book-preview-box" @click="router.push('/book/' + book.slug)">
        <img
            class="book-preview-img"
            :src="
                config.public.apiUrl + `/books/images/${props.book.slug}.jpeg`
            "
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
    </div>
</template>

<style scoped>
.book-preview-box {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 10px;
    margin-bottom: 20px;
    cursor: pointer;
}

.book-preview-box > div > p {
    margin-top: 30px;
}

.book-preview-img {
    box-shadow: 2px 2px 5px rgb(121, 121, 121);
}

#book-link {
    display: block;
    text-decoration: none;
    color: black;
}
</style>
