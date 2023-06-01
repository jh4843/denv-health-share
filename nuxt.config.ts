// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/firebase"],
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/main.scss",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  runtimeConfig: {
    FB_API_KEY: "AIzaSyBJNoQ0IBogFnGZwkTBdrPZUnYp6bKUUi8",
    FB_AUTH_DOMAIN: "denv-funcs",
    FB_PROJECT_ID: "denv-funcs",
  },
});
