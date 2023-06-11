import * as myTypes from "~/types";
import {
  doc,
  getDocs,
  addDoc,
  setDoc,
  collection,
  query,
  where,
  Firestore,
  orderBy,
  startAt,
  deleteDoc,
  limit,
  getCountFromServer,
  Timestamp,
  startAfter,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { url } from "inspector";

export const useFirebaseImage = () => {
  return {
    // Add
    uploadImages: async (
      files: Array<File>,
      _exercieseType: myTypes.eExerciseType,
      _contents: string
    ) => {
      const storage = getStorage();

      const { getUserId } = useFirebaseUser();

      let userId = getUserId();

      if (userId == undefined) {
        userId = "";
      }

      const now = Timestamp.now();

      let imageInfo: myTypes.iImageInfo = {
        exerciseType: _exercieseType,
        creator: userId,
        createTime: now,
        lastupdateTIme: now,
        contents: _contents,
        url: [],
      };

      for (const f of files) {
        const fileName = f.name;
        const fileStoragePath = "/denv-hs/" + fileName;
        const storageRef = ref(storage, fileStoragePath);

        const mountainsRef = await uploadBytes(storageRef, f);

        const url = await getDownloadURL(mountainsRef.ref);

        if (url == undefined || url == null) continue;

        imageInfo.url.push(url);
      }

      const { $firestore } = useNuxtApp();

      const colRef = collection($firestore as Firestore, "image-info");

      imageInfo.id = colRef.id;
      console.log("id:", colRef.id);

      const docRef = await addDoc(colRef, imageInfo);

      console.log("result: ", docRef);
    },

    // Get
    getImageInfoList: async (
      queryCondition: myTypes.iQueryImageInfo
    ): Promise<myTypes.iImageInfo[]> => {
      const { $firestore } = useNuxtApp();

      console.log("getImageInfoList(query): ", queryCondition);

      let queryImageInfo = query(
        collection($firestore as Firestore, "image-info"),
        where("exerciseType", "==", queryCondition.exerciseType),
        orderBy(queryCondition.orderCondition),
        limit(queryCondition.countPerPage)
      );

      let curPageIndex = 0;
      const resItems: Array<myTypes.iImageInfo> = [];
      let lastPageIndex = queryCondition.page;

      while (curPageIndex < lastPageIndex) {
        curPageIndex++;
        const resDocs = await getDocs(queryImageInfo);

        if (curPageIndex >= lastPageIndex) {
          resDocs.docs.forEach((doc) => {
            resItems.push(doc.data() as myTypes.iImageInfo);
          });
          break;
        } else {
          const lastSnapshop = resDocs.docs[resDocs.docs.length - 1];
          const lastItem = lastSnapshop.data() as myTypes.iImageInfo;

          queryImageInfo = query(
            collection($firestore as Firestore, "image-info"),
            where("exerciseType", "==", queryCondition.exerciseType),
            orderBy(queryCondition.orderCondition),
            startAfter(lastSnapshop),
            limit(queryCondition.countPerPage)
          );
        }
      }

      return resItems;
    },

    getImageCount: async (
      queryCondition: myTypes.iQueryImageInfo
    ): Promise<number> => {
      const { $firestore } = useNuxtApp();

      const queryImageInfo = query(
        collection($firestore as Firestore, "image-info"),
        where("exerciseType", "==", queryCondition.exerciseType)
      );

      const snapshot = await getCountFromServer(queryImageInfo);

      const { count } = snapshot.data();

      return count;
    },

    // Delete
    deleteImage: async (item: myTypes.iImageInfo): Promise<boolean> => {
      const storage = getStorage();

      for (const url of item.url) {
        const storageRef = ref(storage, url);
        deleteObject(storageRef);
      }

      const { $firestore } = useNuxtApp();

      const colRef = collection($firestore as Firestore, "image-info");

      const queryTarget = query(
        collection($firestore as Firestore, "image-info"),
        where("url", "array-contains", item.url[0])
      );

      const snapshot = await getDocs(queryTarget);

      snapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log("Complete");

      return true;
    },
  };
};
