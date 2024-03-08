import { Book } from './book.type'
import { Rating } from './rating.type'

export type User = {
    username: string
    fullname?: string
    phonenumber?: string
    email: string
    isAdmin: boolean
    ratings: Rating[]
    favourites: Book[]
}
