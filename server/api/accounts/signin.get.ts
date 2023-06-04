import { getDatabase } from "firebase/database";



export default defineEventHandler(async (event) => {

  const database = getDatabase();




  const query = getQuery(event)
  // return { a: query.param1, b: query.param2 }
});
