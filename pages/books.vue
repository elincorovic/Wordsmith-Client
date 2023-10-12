<script setup lang="ts">
import { Book } from "~/types";

const config = useRuntimeConfig();
const queryParams = useRoute().query;

const { data: books } = await useAsyncData<Book[]>("books", () =>
   $fetch("/books" + buildQuery(queryParams), {
      baseURL: config.public.apiUrl,
   })
);

function buildQuery(query: any) {
   if (!query) return "";
   let queryString = "";
   for (const key in query) {
      queryString = queryString + "?" + key + "=" + query[key];
   }
   return queryString;
}
</script>

<template>
   <h1>Books</h1>
   <div class="books-container">
      <BookPreview v-for="book of books" :book="book" />
   </div>
</template>

<style scoped>
.books-container {
   display: grid;
   grid-template-columns: 100%;
}
</style>
