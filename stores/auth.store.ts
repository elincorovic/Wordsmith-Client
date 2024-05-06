import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userAccessToken: localStorage.getItem('user-access-token'),
    }),
    getters: {
        getUserAccessToken: (state) => state.userAccessToken,
    },
    actions: {
        setUserAccessToken(userAccessToken: string) {
            localStorage.setItem('user-access-token', userAccessToken)
            this.userAccessToken = userAccessToken
        },
    },
})
