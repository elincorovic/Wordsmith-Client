<script setup lang="ts">
import { Book, Category } from '~/types'

const config = useRuntimeConfig()

const { data: categories } = await useAsyncData<Category[]>('categories', () =>
    $fetch('/categories', {
        baseURL: config.public.apiUrl,
    })
)

const { data: books } = await useAsyncData<Book[]>('books', () =>
    $fetch('/books?sortBy=best-rating&limit=3', {
        baseURL: config.public.apiUrl,
    })
)
</script>

<template>
    <div>
        <div id="categories-display">
            <div id="categories-display-head">
                <h2>Categories</h2>
                <RouterLink to="/categories" class="link"
                    >See more...</RouterLink
                >
            </div>
            <div id="categories-display-card-box">
                <RouterLink
                    v-for="category of categories"
                    :to="`/books?category=${category.slug}&limit=10`"
                >
                    <div
                        class="box-shadow category-card"
                        :style="{
                            backgroundImage: `url(${config.public.apiUrl}/categories/images/${category.slug}.jpeg)`,
                        }"
                    >
                        <div id="category-title">{{ category.title }}</div>
                    </div>
                </RouterLink>
            </div>
        </div>

        <BookPreviewDisplay
            v-if="books"
            :books="books"
            title="Best Rating"
            link="/books?sortBy=best-rating"
        />
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
}

#categories-display-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.category-card {
    width: 120px;
    height: 120px;
    background-color: aqua;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 14px;
    background-position: center;
    background-size: cover;
}

#categories-display-card-box {
    overflow-x: auto;
    display: grid;
    grid-gap: 20px;
    grid-auto-flow: column;
    grid-auto-columns: calc(120px);
    padding: 0 6px 6px 0;
}

#categories-display-card-box::-webkit-scrollbar {
    display: none;
}

#categories-display-card-box {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

#category-title {
    position: relative;
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.5);
    height: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
