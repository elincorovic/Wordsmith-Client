import { defineStore } from 'pinia'

const userAccessToken = localStorage.getItem('user-access-token')
const username = localStorage.getItem('username')

export const useAuthStore = defineStore('auth', {
    state: () => ({ username: username, userAccessToken: userAccessToken }),
    getters: {
        username: (state) => state.username,
        userAccessToken: (state) => state.userAccessToken,
    },
    actions: {
        setUserAccessToken(userAccessToken: string) {
            this.userAccessToken = userAccessToken
        },
        setUsername(username: string) {
            this.username = username
        },
    },
})
