import * as myTypes from "~/types";
import {
  getDocs,
  addDoc,
  collection,
  query,
  where,
  Firestore,
} from "firebase/firestore";

export const useFirebaseUser = () => {
  return {
    isSignedIn: () => {
      let id = localStorage.getItem("userId");

      if(id == undefined || id == null) {
        return false;
      }
      return true;
    },

    getUserId: () => {
      let id = localStorage.getItem("userId");

      if(id == undefined || id == null) {
        return undefined;
      }
      return id;
    },

    signInUser: async (userInfo: myTypes.iUserInfo) => {
      const { $firestore } = useNuxtApp();

      const { userId, password } = userInfo;

      console.log("queries", $firestore, userId, password);

      const colRef = query(
        collection($firestore as Firestore, "accounts"),
        where("userId", "==", userId),
        where("password", "==", password)
      );

      const snapshot = await getDocs(colRef);

      console.log("snapshot", snapshot.size, "docs: ", snapshot.docs);

      if (snapshot.size > 0) {
        localStorage.setItem("userId", userInfo.userId);

        const router = useRouter();
        router.push({ path: "/main" });

        return true;
      }

      return false;
    },

    signOutUser: () => {
      localStorage.removeItem("userId");

      console.log("signOut");

      const router = useRouter();
      router.push({ path: "/accounts/signin" });
    },

    signUpUser: async (userInfo: myTypes.iUserInfo) => {
      const { $firestore } = useNuxtApp();

      const colRef = collection($firestore as Firestore, "accounts");

      const docRef = await addDoc(colRef, userInfo);

      return docRef;
    },
  };
};
