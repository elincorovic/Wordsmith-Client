<script setup lang="ts">
import { Book } from '~/types'

const config = useRuntimeConfig()

const { data: books } = await useAsyncData<Book[]>('books', () =>
    $fetch('/books?sortBy=best-rating&limit=3', {
        baseURL: config.public.apiUrl,
    })
)
</script>

<template>
    <div>
        <h1>Home</h1>
        <BookPreviewDisplay
            v-if="books"
            :books="books"
            title="Top Books"
            link="/books?sortBy=best-rating"
        />
    </div>
</template>
