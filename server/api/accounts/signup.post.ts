import { getDatabase, ref, set } from "firebase/database";

export default defineEventHandler(async (event) => {
  const db = getDatabase();

  const body = getBody(event);

  return { a: query.param1, b: query.param2 };
});
