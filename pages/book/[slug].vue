<script setup lang="ts">
import { BookDetails, Rating } from '~/types'

const now = new Date().getTime()
const config = useRuntimeConfig()
const queryParams = useRoute().params

const { data: book } = await useAsyncData<BookDetails>('book', () =>
    $fetch('/books/' + queryParams.slug, {
        baseURL: config.public.apiUrl,
    })
)

const ratingDistribution = getRatingDistribution(book.value?.ratings)
const totalRatings = book.value?.ratings.length ? book.value.ratings.length : 1

//portions of every rating from 1-5 (in %)
const rating4Portion = (ratingDistribution[3] / totalRatings) * 100
const rating3Portion = (ratingDistribution[2] / totalRatings) * 100
const rating2Portion = (ratingDistribution[1] / totalRatings) * 100
const rating5Portion = (ratingDistribution[4] / totalRatings) * 100
const rating1Portion = (ratingDistribution[0] / totalRatings) * 100

const rating5BarWidth = ref(rating5Portion + '%')
const rating4BarWidth = ref(rating4Portion + '%')
const rating3BarWidth = ref(rating3Portion + '%')
const rating2BarWidth = ref(rating2Portion + '%')
const rating1BarWidth = ref(rating1Portion + '%')

function msToTimeString(ms: number): string {
    let seconds = Math.floor(ms / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    if (hours > 0) {
        return hours + 'h'
    } else if (minutes > 0) {
        return minutes + 'min'
    } else {
        return seconds + 's'
    }
}

function getRatingDistribution(ratings: Rating[] | undefined): number[] {
    if (!ratings) return [0, 0, 0, 0, 0]
    let ratingDistribution = [0, 0, 0, 0, 0]
    ratings.forEach((rating) => {
        ratingDistribution[rating.rating - 1] += 1
    })
    return ratingDistribution
}
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
                            <a
                                :href="'/books?category=' + value.slug"
                                class="link"
                                >{{ value.title }}</a
                            >
                            <span v-if="index < book.categories.length - 1"
                                >,
                            </span>
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
                        config.public.apiUrl +
                        '/books/pdfs/' +
                        book.slug +
                        '.pdf'
                    "
                    target="_blank"
                    ><ButtonPrimary :full-width="true"
                        >Download</ButtonPrimary
                    ></a
                >
                <ButtonSecondary :full-width="true"
                    >Read online</ButtonSecondary
                >
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
                    <ButtonPrimary :full-width="true"
                        >Rate this Book</ButtonPrimary
                    >
                </div>
            </div>

            <div id="ratings-distribution">
                <div class="ratings-distribution-row">
                    <div>5 / 5</div>
                    <div class="ratings-distribution-bar-bg">
                        <div
                            class="ratings-distribution-bar"
                            id="rating-bar-5"
                        ></div>
                    </div>
                    <div class="ratings-portion">{{ rating5Portion }} %</div>
                </div>

                <div class="ratings-distribution-row">
                    <div>4 / 5</div>
                    <div class="ratings-distribution-bar-bg">
                        <div
                            class="ratings-distribution-bar"
                            id="rating-bar-4"
                        ></div>
                    </div>
                    <div class="ratings-portion">{{ rating4Portion }} %</div>
                </div>

                <div class="ratings-distribution-row">
                    <div>3 / 5</div>
                    <div class="ratings-distribution-bar-bg">
                        <div
                            class="ratings-distribution-bar"
                            id="rating-bar-3"
                        ></div>
                    </div>
                    <div class="ratings-portion">{{ rating3Portion }} %</div>
                </div>

                <div class="ratings-distribution-row">
                    <div>2 / 5</div>
                    <div class="ratings-distribution-bar-bg">
                        <div
                            class="ratings-distribution-bar"
                            id="rating-bar-2"
                        ></div>
                    </div>
                    <div class="ratings-portion">{{ rating2Portion }} %</div>
                </div>

                <div class="ratings-distribution-row">
                    <div>1 / 5</div>
                    <div class="ratings-distribution-bar-bg">
                        <div
                            class="ratings-distribution-bar"
                            id="rating-bar-1"
                        ></div>
                    </div>
                    <div class="ratings-portion">{{ rating1Portion }} %</div>
                </div>
            </div>

            <div>
                <div v-for="rating of book.ratings" class="rating-box">
                    <img
                        :src="
                            config.public.apiUrl +
                            '/users/images/' +
                            rating.username +
                            '.jpeg'
                        "
                        :alt="rating.username"
                        class="ratings-user-img box-shadow"
                    />
                    <div class="ratings-details">
                        <p>
                            <span class="ratings-username">{{
                                rating.username
                            }}</span>
                            <span class="ratings-created">
                                -
                                {{
                                    msToTimeString(
                                        now -
                                            new Date(rating.createdAt).getTime()
                                    )
                                }}
                            </span>
                        </p>
                        <p v-if="rating.comment">{{ rating.comment }}</p>
                        <p>{{ rating.rating }} / 5</p>
                    </div>
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

#ratings-distribution {
    padding: 20px 0;
}

.ratings-distribution-row {
    display: grid;
    grid-template-columns: 1fr 6fr 1.3fr;
    align-items: center;
    padding: 2px 0;
    gap: 5px;
}

.ratings-distribution-bar-bg {
    position: relative;
    width: 100%;
    height: 12px;
    border-radius: 10px;
}

.ratings-distribution-bar-bg::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 12px;
    background-color: $primary;
    border-radius: 10px;
    opacity: 0.5;
}

.ratings-distribution-bar {
    position: absolute;
    width: 0px;
    height: 12px;
    background-color: $primary;
    border-radius: 10px;
    opacity: 1;
    z-index: 0;
}

.rating-box {
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 20px;
    padding: 20px 0;
    border-top: 1px solid rgb(190, 190, 190);
}

.ratings-user-img {
    border-radius: 50%;
}

.ratings-username {
    font-weight: bold;
}

.ratings-details > p {
    margin: 0 0 10px 0;
}

.ratings-created {
    color: gray;
}

#rating-bar-5 {
    width: v-bind(rating5BarWidth);
}

#rating-bar-4 {
    width: v-bind(rating4BarWidth);
}

#rating-bar-3 {
    width: v-bind(rating3BarWidth);
}

#rating-bar-2 {
    width: v-bind(rating2BarWidth);
}

#rating-bar-1 {
    width: v-bind(rating1BarWidth);
}

.ratings-portion {
    text-align: right;
}
</style>
