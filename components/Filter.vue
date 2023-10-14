<script setup>
let showFilters = useState("showFilter", () => false);
let showSort = useState("showSort", () => false);

function toggleFilter() {
   if (showSort.value) showSort.value = false;
   if (showFilters.value) showFilters.value = false;
   else showFilters.value = true;
}

function toggleSort() {
   if (showFilters.value) showFilters.value = false;
   if (showSort.value) showSort.value = false;
   else showSort.value = true;
}
</script>

<template>
   <div id="filter-bg">
      <div id="filter-head">
         <div
            class="filter-head-tab"
            :class="{ 'filter-head-tab-active': showSort }"
            @click="toggleSort"
         >
            Sort by
         </div>
         <div id="filter-head-separator"></div>
         <div
            class="filter-head-tab"
            :class="{ 'filter-head-tab-active': showFilters }"
            @click="toggleFilter"
         >
            Filter
         </div>
      </div>
      <div v-if="showFilters" id="filters">
         <div class="dropdown-button">
            <div>Category</div>
            <div>Y</div>
         </div>
         <div class="dropdown-button">
            <div>Release year</div>
            <div>Y</div>
         </div>
         <div class="dropdown-button">
            <div>Rating</div>
            <div>Y</div>
         </div>
      </div>
      <div v-if="showSort" id="sort">
         <div class="sort-button">
            <div>Best Rating</div>
            <div>Y</div>
         </div>
         <div class="sort-button">
            <div>Popularity</div>
            <div>Y</div>
         </div>
         <div class="sort-button">
            <div>Title</div>
            <div>Y</div>
         </div>
         <div class="sort-button">
            <div>Author</div>
            <div>Y</div>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
#filter-bg {
   background-color: $secondary;
   width: 100vw;
   margin: 0px 0px 30px -15px;
   border-top: 1px solid gray;
   border-bottom: 1px solid gray;
}

#filter-head {
   display: grid;
   grid-template-columns: 1fr 1px 1fr;
   align-items: center;
}

.filter-head-tab {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 42px;
   cursor: pointer;
}

.filter-head-tab-active {
   background-color: $accent;
   color: $secondary;
}

#filter-head-separator {
   height: 10px;
   background-color: gray;
   width: 1px;
}

.dropdown-button {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0px 15px;
   border-top: 1px solid gray;
   height: 42px;
   cursor: pointer;
}

.sort-button {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0px 15px;
   border-top: 1px solid gray;
   height: 42px;
   cursor: pointer;
}
</style>
