export default defineEventHandler(async (e) => {
  if (e.req.method === "GET") {
    return;
  }
});
