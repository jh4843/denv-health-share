import * as myTypes from "~/types";
import {
  getDocs,
  addDoc,
  setDoc,
  collection,
  query,
  where,
  Firestore,
  orderBy,
  startAt,
  limit,
  getCountFromServer,
  Timestamp,
  startAfter,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useFirebaseImage = () => {
  return {
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

      const docRef = await addDoc(colRef, imageInfo);

      console.log("result: ", docRef);
    },

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

        console.log(
          "index search ",
          queryImageInfo,
          curPageIndex,
          lastPageIndex
        );

        if (curPageIndex >= lastPageIndex) {
          resDocs.docs.forEach((doc) => {
            resItems.push(doc.data() as myTypes.iImageInfo);
          });
          console.log("res: ", resItems, curPageIndex, lastPageIndex);
          break;
        } else {
          const lastSnapshop = resDocs.docs[resDocs.docs.length - 1];
          const lastItem = lastSnapshop.data() as myTypes.iImageInfo;

          console.log("tt: ", lastSnapshop.data(), curPageIndex);

          queryImageInfo = query(
            collection($firestore as Firestore, "image-info"),
            where("exerciseType", "==", queryCondition.exerciseType),
            orderBy(queryCondition.orderCondition),
            startAfter(lastSnapshop),
            limit(queryCondition.countPerPage)
          );
        }
      }

      console.log("res: ", resItems);

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
  };
};
