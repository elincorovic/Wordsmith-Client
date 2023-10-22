<script setup lang="ts">
import { Book } from '~/types'

const router = useRouter()
const props = defineProps<{
    book: Book
}>()

const config = useRuntimeConfig()
</script>

<template>
    <div class="book-preview-box" @click="router.push('/book/' + book.slug)">
        <img
            class="box-shadow"
            :src="
                config.public.apiUrl + `/books/images/${props.book.slug}.jpeg`
            "
            :alt="props.book.title"
        />
        <div id="preview-details">
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
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    margin-bottom: 20px;
    cursor: pointer;
}

.book-preview-box > div > p {
    margin-top: 30px;
}

#book-link {
    display: block;
    text-decoration: none;
    color: black;
}

#preview-details {
    padding-right: 5px;
}
</style>
