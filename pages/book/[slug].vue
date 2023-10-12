<script setup lang="ts">
import { BookDetails } from "~/types";

const config = useRuntimeConfig();
const queryParams = useRoute().params;

const { data: book } = await useAsyncData<BookDetails>("book", () =>
   $fetch("/books/" + queryParams.slug, {
      baseURL: config.public.apiUrl,
   })
);
</script>

<template>
   <div>
      <div v-if="!book">Book not found</div>
      <div v-else>
         <h1 id="book-title">{{ book.title }}</h1>

         <p id="book-author">
            by
            <a :href="`/books?author=${book.author}`" class="link">{{
               book.author
            }}</a>
         </p>

         <img
            :src="config.public.apiUrl + `/books/images/${book.slug}.jpeg`"
            :alt="book.title"
            class="box-shadow"
            id="book-img"
         />

         <div id="details-box">
            <div class="details-row">
               <p>Categories:</p>
               <p>
                  <span v-for="(value, index) of book.categories">
                     <a :href="'/books?category=' + value.slug" class="link">{{
                        value.title
                     }}</a>
                     <span v-if="index < book.categories.length - 1">, </span>
                  </span>
               </p>
            </div>
            <div class="details-row">
               <p>Year:</p>
               <p>
                  {{ book.year }}
               </p>
            </div>
            <div class="details-row">
               <p>Pages:</p>
               <p>
                  {{ book.pages }}
               </p>
            </div>
            <div class="details-row">
               <p>ISBN:</p>
               <p>12345678</p>
            </div>
            <div class="details-row">
               <p>Language:</p>
               <p>{{ book.language }}</p>
            </div>
         </div>

         <div id="book-description">{{ book.description }}</div>

         <div id="button-container">
            <a
               :href="
                  config.public.apiUrl + '/books/pdfs/' + book.slug + '.pdf'
               "
               target="_blank"
               ><ButtonPrimary :full-width="true">Download</ButtonPrimary></a
            >
            <ButtonSecondary :full-width="true">Read online</ButtonSecondary>
         </div>

         <h2>Ratings on this Book</h2>

         <div class="box-shadow" id="ratings-overview-bg">
            <div id="ratings-overview-box">
               <div id="ratings-overview-flex">
                  <div id="avg-rating">{{ book.avgRating }}</div>
                  <div id="ratings-overview-details">
                     <div>{{ book.avgRating }} / 5</div>
                     <div>{{ book.ratings.length }} Ratings</div>
                  </div>
               </div>
               <ButtonPrimary :full-width="true">Rate this Book</ButtonPrimary>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
#book-title,
#book-author {
   text-align: center;
   margin-bottom: 30px;
}

#book-img {
   width: 66%;
   display: block;
   margin: 0 auto;
}

#button-container {
   margin-top: 20px;
   margin-bottom: 40px;
   display: grid;
   gap: 5px;
   grid-template-columns: 1fr 1fr;
}

.details-row {
   display: grid;
   grid-template-columns: 1fr 2fr;
}

.details-row > p {
   margin: 0 0 10px 0;
}

#details-box {
   margin-top: 40px;
}

#book-description {
   margin-top: 20px;
}

#ratings-overview-bg {
   background-color: $secondary;
   border-radius: 14px;
}

#ratings-overview-box {
   width: 66%;
   margin: 0 auto;
   padding: 20px 0px;
}

#avg-rating {
   font-size: 62px;
   font-weight: bold;
   margin-right: 10px;
}

#ratings-overview-flex {
   display: flex;
}

#ratings-overview-details {
   padding-top: 10px;
   padding-bottom: 12px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
}
</style>
