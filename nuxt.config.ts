// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/_colors.scss" as *;',
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
        },
    },
    css: ['~/assets/scss/style.scss', '~/assets/scss/forms.scss'],
    modules: ['@pinia/nuxt'],
})
