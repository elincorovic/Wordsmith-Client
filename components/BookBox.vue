<script setup>
defineProps(["books", "title"]);

const config = useRuntimeConfig();
</script>

<template>
    <div v-if="books && title">
        <div class="book-box-head">
            <h2>{{ title }}</h2>
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
                <p>{{ book.avgRating }} / 5</p>
            </div>
        </div>
    </div>
</template>
