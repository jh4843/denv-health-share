import * as myTypes from "~/types";
import { getDocs, addDoc, collection, query, where, Firestore } from "firebase/firestore";
import { userInfo } from "os";

export const useFirebaseUser = () => {

  return {
    signInUser: async (userInfo:myTypes.iUserInfo) => {

      const { $firestore } = useNuxtApp();

      const { userId, password } = userInfo;

      console.log("queries", $firestore, userId, password);
    
      const colRef = query(collection($firestore as Firestore, "accounts"), where("userId", "==", userId), where("password", "==", password) );
    
      const snapshot = await getDocs(colRef);

      console.log("snapshot", snapshot.size, "docs: ", snapshot.docs);
    
      if(snapshot.size > 0)
      {
        return true;
      }
    
      return false;
    },

    signUpUser: async (userInfo:myTypes.iUserInfo) => {
      const { $firestore } = useNuxtApp();

      const colRef = collection($firestore as Firestore, "accounts");

      const docRef = await addDoc(colRef, userInfo);
    
      return docRef
    }
  }
};