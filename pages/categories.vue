<script setup lang="ts">
import { Category } from '~/types'

const config = useRuntimeConfig()

const { data: categories } = await useAsyncData<Category[]>('categories', () =>
    $fetch('/categories', {
        baseURL: config.public.apiUrl,
    })
)
</script>

<template>
    <h1>Categories</h1>
    <div id="categories-display-card-box">
        <RouterLink
            v-for="category of categories"
            :to="`/books?category=${category.slug}&limit=10`"
            class="link"
        >
            <div
                class="box-shadow category-card"
                :style="{
                    backgroundImage: `url(${config.public.apiUrl}/categories/images/${category.slug}.jpeg)`,
                }"
            >
                <div class="category-title">{{ category.title }}</div>
            </div>
        </RouterLink>
    </div>
</template>

<style scoped>
h1 {
    margin-block-start: 5px;
    margin-block-end: 30px;
    text-align: center;
}

.category-card {
    width: 100%;
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
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
    padding: 0 6px 6px 0;
}

.category-title {
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.5);
    height: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: dashed;
}
</style>
