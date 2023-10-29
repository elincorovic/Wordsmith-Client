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
        <h1 id="title">Free Books for <span class="primary">instant</span> download!</h1>
        <p id="welcome-text">Welcome to Wordsmith, where books are limitless and free. Sign up or log in for unlimited access!</p>
        <a href="/browse" id="browse-link"><ButtonPrimary :full-width="false">Browse Books</ButtonPrimary></a>
        <div id="bookpanel"></div>
        <BookPreviewDisplay
            v-if="books"
            :books="books"
            title="Top Books"
            link="/books?sortBy=best-rating"
        />
    </div>
</template>

<style scoped lang="scss">
#title {
    margin: 50px auto 0px auto;
    width: 80vw;
    text-align: center;
    font-size: 44px;
    font-weight: 900;
    font-family: Roboto, sans-serif;
}

#welcome-text {
    font-size: 20px;
    text-align: center;
}

#browse-link {
    width: fit-content;
    display: block;
    margin: 0 auto 30px auto;
}

#bookpanel {
    height: 50vh;
    background: linear-gradient(to top, rgb(238, 237, 226, 0), $background), url('~/assets/imgs/bookpanel-mobile.png') no-repeat;
    background-position: bottom;
    background-size: cover;
}
</style>
