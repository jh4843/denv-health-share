import * as myTypes from "~/types";
import {
  getDocs,
  addDoc,
  setDoc,
  collection,
  query,
  where,
  Firestore,
} from "firebase/firestore";
import { ref } from "firebase/storage";

export const useFirebaseImage = () => {
  return {
    uploadImages: async (imgInfos: FileList) => {
      const { $firestorage, $firestore } = useNuxtApp();
    },

    signUpUser: async (userInfo: myTypes.iUserInfo) => {
      // const { $firestore } = useNuxtApp();
      // const colRef = collection($firestore as Firestore, "accounts");
      // const docRef = await addDoc(colRef, userInfo);
      // return docRef;
    },
  };
};
