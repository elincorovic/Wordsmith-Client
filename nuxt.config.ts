// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/_colors.scss" as *;',
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
        },
    },
});
