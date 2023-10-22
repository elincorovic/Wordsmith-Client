import { Category } from './category.type'
import { Rating } from './rating.type'

export type BookDetails = {
    title: string
    slug: string
    author: string
    year: number
    pages: number
    language: string
    description: string
    avgRating: number
    createdAt: Date
    updatedAt: Date
    ratings: Rating[]
    categories: Category[]
}
