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

      if (id == undefined || id == null) {
        return false;
      }
      return true;
    },

    getUserId: () => {
      let id = localStorage.getItem("userId");

      if (id == undefined || id == null) {
        return undefined;
      }
      return id;
    },

    getUserClass: (): myTypes.eUserClass => {
      return Number(localStorage.getItem("userClass"));
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
        const dbUserInfo = snapshot.docs.at(0)!.data();
        localStorage.setItem("userId", dbUserInfo.userId);
        localStorage.setItem("userClass", dbUserInfo.userClass!.toString());

        const router = useRouter();
        router.push({ path: "/main" });

        return true;
      }

      return false;
    },

    signOutUser: () => {
      localStorage.removeItem("userId");
      localStorage.removeItem("userClass");

      console.log("signOut");

      const router = useRouter();
      router.push({ path: "/accounts/signin" });
    },

    signUpUser: async (userInfo: myTypes.iUserInfo) => {
      const { $firestore } = useNuxtApp();

      const colRef = collection($firestore as Firestore, "accounts");

      const snapshot = query(colRef, where("userId", "==", userInfo.userId));

      const docs = await getDocs(snapshot);

      console.log("snapshot", docs.size, "docs: ", docs.docs);

      if (docs.size > 0) {
        console.log("failed to register userID: " + userInfo.userId, snapshot);
        return false;
      } else {
        await addDoc(colRef, userInfo);
        return true;
      }
    },
  };
};
