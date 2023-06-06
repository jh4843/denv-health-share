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
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const useFirebaseImage = () => {
  return {
    uploadImages: async (files: Array<File>) => {
      const storage = getStorage();

      for (const f of files) {
        const fileName = f.name;
        const fileStoragePath = "/denv-hs/" + fileName;
        const storageRef = ref(storage, fileStoragePath);

        const mountainsRef = uploadBytes(storageRef, f);

        console.log("result: ", mountainsRef, fileStoragePath);
      }
    },

    signUpUser: async (userInfo: myTypes.iUserInfo) => {
      // const { $firestore } = useNuxtApp();
      // const colRef = collection($firestore as Firestore, "accounts");
      // const docRef = await addDoc(colRef, userInfo);
      // return docRef;
    },
  };
};
