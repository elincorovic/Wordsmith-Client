<script setup lang="ts">
import { Category } from '~/types'

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

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
const sortByFromRoute = route.query.sortBy

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

let selectedFromYear = useState('selectedFromYear', () => releaseFromRoute)

let selectedToYear = useState('selectedToYear', () => releasetoRoute)

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

async function filter() {
    let query: any = {}
    for (const key in route.query) {
        query[key] = route.query[key]
    }
    query.category =
        selectedCategories.value.length > 0
            ? selectedCategories.value.join(',')
            : null
    query.rating =
        selectedRatings.value.length > 0
            ? selectedRatings.value.join(',')
            : null
    query.fromYear = selectedFromYear.value
    query.toYear = selectedToYear.value

    let newRoute = '/books?'

    for (const key in query) {
        if (query[key]) {
            newRoute += `${key}=${query[key]}&`
        }
    }

    await router.push(newRoute)
    router.go(0)
}

async function sort(sortBy: string) {
    let query: any = {}
    for (const key in route.query) {
        query[key] = route.query[key]
    }
    query.sortBy = sortBy

    let newRoute = '/books?'

    for (const key in query) {
        if (query[key]) {
            newRoute += `${key}=${query[key]}&`
        }
    }

    await router.push(newRoute)
    router.go(0)
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
                <img
                    v-if="!showCategories"
                    src="~/assets/icons/arrows/arrow-down.png"
                    alt="arrow-down"
                    class="arrow-icon"
                />
                <img
                    v-if="showCategories"
                    src="~/assets/icons/arrows/arrow-up.png"
                    alt="arrow-up"
                    class="arrow-icon"
                />
            </div>

            <div
                v-if="showCategories"
                class="dropdown"
                id="dropdown-categories"
            >
                <div v-for="categoryBlock of categoriesSorted">
                    <h2>{{ categoryBlock[0].title[0].toLocaleUpperCase() }}</h2>
                    <div
                        v-for="category of categoryBlock"
                        @click="toggleCategory(category.slug)"
                        class="category-select"
                    >
                        <p
                            class="category-select-title"
                            :class="{
                                primary: selectedCategories.includes(
                                    category.slug
                                ),
                            }"
                        >
                            {{ category.title }}
                        </p>
                        <img
                            v-if="selectedCategories.includes(category.slug)"
                            src="~/assets/icons/check.png"
                            class="selected-icon"
                        />
                    </div>
                </div>
            </div>

            <div class="dropdown-button" @click="showRelease = !showRelease">
                <div>Release year</div>
                <img
                    v-if="!showRelease"
                    src="~/assets/icons/arrows/arrow-down.png"
                    alt="arrow-down"
                    class="arrow-icon"
                />
                <img
                    v-if="showRelease"
                    src="~/assets/icons/arrows/arrow-up.png"
                    alt="arrow-up"
                    class="arrow-icon"
                />
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
                <img
                    v-if="!showRating"
                    src="~/assets/icons/arrows/arrow-down.png"
                    alt="arrow-down"
                    class="arrow-icon"
                />
                <img
                    v-if="showRating"
                    src="~/assets/icons/arrows/arrow-up.png"
                    alt="arrow-up"
                    class="arrow-icon"
                />
            </div>

            <div v-if="showRating" class="dropdown">
                <div
                    class="ratings-select"
                    v-for="i in 5"
                    @click="toggleRating(i.toString())"
                >
                    <div class="ratings-select-row">
                        <img
                            v-for="j in i"
                            src="~/assets/icons/stars/star.png"
                            alt="star"
                            class="star-icon"
                        />
                        <img
                            v-for="j in 5 - i"
                            src="~/assets/icons/stars/star-nofill.png"
                            alt="star"
                            class="star-icon"
                        />
                        <span
                            :class="{
                                primary: selectedRatings.includes(i.toString()),
                            }"
                            class="ratings-select-text"
                            >{{ i }} Star{{ i > 1 ? 's' : '' }}</span
                        >
                    </div>
                    <img
                        v-if="selectedRatings.includes(i.toString())"
                        src="~/assets/icons/check.png"
                        class="selected-icon"
                    />
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
            <div
                class="sort-button"
                :class="{ primary: sortByFromRoute == 'best-rating' }"
                @click="sort('best-rating')"
            >
                <div>Best Rating</div>
                <img
                    src="~/assets/icons/check.png"
                    v-if="sortByFromRoute == 'best-rating'"
                    class="selected-icon"
                />
            </div>
            <div
                class="sort-button"
                :class="{ primary: sortByFromRoute == 'popularity' }"
                @click="sort('popularity')"
            >
                <div>Popularity</div>
                <img
                    src="~/assets/icons/check.png"
                    v-if="sortByFromRoute == 'popularity'"
                    class="selected-icon"
                />
            </div>
            <div
                class="sort-button"
                :class="{ primary: sortByFromRoute == 'title' }"
                @click="sort('title')"
            >
                <div>Title</div>
                <img
                    src="~/assets/icons/check.png"
                    v-if="sortByFromRoute == 'title'"
                    class="selected-icon"
                />
            </div>
            <div
                class="sort-button"
                :class="{ primary: sortByFromRoute == 'author' }"
                @click="sort('author')"
            >
                <div>Author</div>
                <img
                    src="~/assets/icons/check.png"
                    v-if="sortByFromRoute == 'author'"
                    class="selected-icon"
                />
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

#dropdown-categories {
    padding-bottom: 20px;
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
    align-items: center;
}

.category-select-title {
    margin: 0;
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
    align-items: center;
    margin: 10px 0;
    cursor: pointer;
}

.ratings-select-text {
    margin-left: 10px;
}

.ratings-select-row {
    display: flex;
}

.arrow-icon {
    width: 15px;
}

.selected-icon {
    display: block;
    width: 15px;
    height: 15px;
}

.star-icon {
    width: 15px;
    height: 15px;
}
</style>
