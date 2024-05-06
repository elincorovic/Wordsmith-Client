import { defineStore } from 'pinia'

const userAccessToken = localStorage.getItem('user-access-token')

export const useAuthStore = defineStore('auth', {
    state: () => ({ userAccessToken: userAccessToken }),
    getters: {
        userAccessToken: (state) => state.userAccessToken,
    },
    actions: {
        setUserAccessToken(userAccessToken: string) {
            localStorage.setItem('user-access-token', userAccessToken)
            this.userAccessToken = userAccessToken
        },
    },
})
