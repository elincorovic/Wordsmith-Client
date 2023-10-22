<script setup lang="ts">
import { Category } from '~/types'

const config = useRuntimeConfig()
const route = useRoute()

const categoriesFromRoute = route.query.category
    ? route.query.category.toString().split(',')
    : new Array<string>()
const releaseFromRoute = route.query.fromYear
    ? parseInt(route.query.fromYear?.toString())
    : null
const releasetoRoute = route.query.toYear
    ? parseInt(route.query.toYear?.toString())
    : null
const ratingsFromRoute = route.query.rating
    ? route.query.rating.toString().split(',')
    : new Array<string>()

const { data: categories } = await useAsyncData<Category[]>('categories', () =>
    $fetch('/categories', {
        baseURL: config.public.apiUrl,
    })
)

const categoriesSorted: Category[][] = categories.value
    ? sortCategories(categories.value)
    : []

//filter/sort tab display
let showFilters = useState('showFilter', () => false)
let showSort = useState('showSort', () => false)

//filter dropdowns display
let showCategories = useState('showCategories', () => false)
let showRelease = useState('showRelease', () => false)
let showRating = useState('showRating', () => false)

//selected categories in filter
let selectedCategories = useState(
    'selectedCategories',
    () => new Array<string>(...categoriesFromRoute)
)

//selected ratings in filter
let selectedRatings = useState(
    'selectedRatings',
    () => new Array<string>(...ratingsFromRoute)
)

let selectedFromYear = useState('fromYear', () => releaseFromRoute)
let selectedToYear = useState('toYear', () => releasetoRoute)

function toggleFilter() {
    if (showSort.value) showSort.value = false
    if (showFilters.value) showFilters.value = false
    else showFilters.value = true
}

function toggleSort() {
    if (showFilters.value) showFilters.value = false
    if (showSort.value) showSort.value = false
    else showSort.value = true
}

function sortCategories(categories: Category[]) {
    let sorted: Array<Category[]> = [[]]
    let currentLetter = categories[0].title[0].toLocaleLowerCase()
    let currentLetterIndex = 0
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].title[0].toLocaleLowerCase() == currentLetter) {
            sorted[currentLetterIndex].push(categories[i])
        } else {
            sorted.push([])
            currentLetter = categories[i].title[0].toLocaleLowerCase()
            currentLetterIndex++
            sorted[currentLetterIndex].push(categories[i])
        }
    }
    return sorted
}

function toggleCategory(category: string) {
    if (selectedCategories.value.includes(category)) {
        selectedCategories.value.splice(
            selectedCategories.value.indexOf(category),
            1
        )
    } else {
        selectedCategories.value.push(category)
    }
}

function toggleRating(rating: string) {
    if (selectedRatings.value.includes(rating)) {
        selectedRatings.value.splice(selectedRatings.value.indexOf(rating), 1)
    } else {
        selectedRatings.value.push(rating)
    }
}

function filter() {
    console.log(selectedCategories.value)
    console.log(selectedFromYear.value)
    console.log(selectedToYear.value)
    console.log(selectedRatings.value)
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
            <div
                class="dropdown-button"
                @click="showCategories = !showCategories"
            >
                <div>Category</div>
                <div>Y</div>
            </div>

            <div v-if="showCategories" class="dropdown">
                <div v-for="categoryBlock of categoriesSorted">
                    <h2>{{ categoryBlock[0].title[0].toLocaleUpperCase() }}</h2>
                    <div
                        v-for="category of categoryBlock"
                        @click="toggleCategory(category.slug)"
                        class="category-select"
                    >
                        <p>{{ category.title }}</p>
                        <p v-if="selectedCategories.includes(category.slug)">
                            Y
                        </p>
                    </div>
                </div>
            </div>

            <div class="dropdown-button" @click="showRelease = !showRelease">
                <div>Release year</div>
                <div>Y</div>
            </div>

            <div v-if="showRelease" class="dropdown">
                <div class="release-input-row">
                    <p>from Year:</p>
                    <input
                        v-model="selectedFromYear"
                        type="number"
                        placeholder="1893"
                        class="input-release"
                    />
                </div>
                <div class="release-input-row">
                    <p>to Year:</p>
                    <input
                        v-model="selectedToYear"
                        type="number"
                        placeholder="2023"
                        class="input-release"
                    />
                </div>
            </div>

            <div class="dropdown-button" @click="showRating = !showRating">
                <div>Rating</div>
                <div>Y</div>
            </div>

            <div v-if="showRating" class="dropdown">
                <div class="ratings-select" @click="toggleRating('1')">
                    <p>Y X X X X <span>1 Star</span></p>
                    <p v-if="selectedRatings.includes('1')">Y</p>
                </div>
                <div class="ratings-select" @click="toggleRating('2')">
                    <p>Y Y X X X <span>2 Star</span></p>
                    <p v-if="selectedRatings.includes('2')">Y</p>
                </div>
                <div class="ratings-select" @click="toggleRating('3')">
                    <p>Y Y Y X X <span>3 Star</span></p>
                    <p v-if="selectedRatings.includes('3')">Y</p>
                </div>
                <div class="ratings-select" @click="toggleRating('4')">
                    <p>Y Y Y Y X <span>4 Star</span></p>
                    <p v-if="selectedRatings.includes('4')">Y</p>
                </div>
                <div class="ratings-select" @click="toggleRating('5')">
                    <p>Y Y Y Y Y <span>5 Star</span></p>
                    <p v-if="selectedRatings.includes('5')">Y</p>
                </div>
            </div>

            <div id="filter-buttons">
                <ButtonPrimary :full-width="true" @click="filter"
                    >Apply</ButtonPrimary
                >
                <ButtonSecondary :full-width="true">Reset</ButtonSecondary>
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
}

#filter-head {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    align-items: center;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
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
    border-bottom: 1px solid gray;
    height: 42px;
    cursor: pointer;
}

.dropdown {
    padding: 0px 15px;
    border-bottom: 1px solid gray;
}

.sort-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    border-bottom: 1px solid gray;
    height: 42px;
    cursor: pointer;
}

.category-select {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}

#filter-buttons {
    display: grid;
    padding: 10px;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    border-bottom: 1px solid gray;
}

.release-input-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
}

.input-release {
    display: block;
    padding: 10px;
    width: 100%;
    background-color: white;
    border: 1px solid black;
    border-radius: 14px;
    box-sizing: border-box;
}

.ratings-select {
    display: flex;
    justify-content: space-between;
}
</style>
