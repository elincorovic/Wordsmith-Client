<script setup lang="ts">
import { Category } from "~/types";

const config = useRuntimeConfig();

const { data: categories } = await useAsyncData<Category[]>("categories", () =>
    $fetch("/categories", {
        baseURL: config.public.apiUrl,
    })
);

console.log(categories);
</script>

<template>
    <div>
        <h1>Browse Books</h1>
    </div>
    <div id="categories-display">
        <div id="categories-display-head">
            <h2>Categories</h2>
            <a href="/categories" class="link">See more...</a>
        </div>
        <div id="categories-display-card-box">
            <div
                v-for="category of categories"
                class="box-shadow category-card"
                :style="{
                    backgroundImage: `url(${config.public.apiUrl}/categories/images/${category.slug}.jpeg)`,
                }"
            >
                <div id="category-title">{{ category.title }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#categories-display-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.category-card {
    width: 100px;
    height: 100px;
    background-color: aqua;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 14px;
    background-position: center;
}

#categories-display-card-box {
    overflow-x: auto;
    display: grid;
    grid-gap: 20px;
    grid-auto-flow: column;
    grid-auto-columns: calc(100px);
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
