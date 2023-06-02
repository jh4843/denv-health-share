export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  return { a: query.param1, b: query.param2 }
});
