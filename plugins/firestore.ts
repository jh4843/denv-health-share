export default defineNuxtPlugin(() => {
  addRouteMiddleware('firestore', () => {
    const { $firestore } = useNuxtApp()

    console.log($firestore);
  })
})