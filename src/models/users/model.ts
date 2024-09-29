import { createCollectionRef, createDocRef, db } from "@/lib/firebase";
import type { DocRequestParams } from "@/types/api.ts";
import { FieldPath, getDoc, getDocs, query, where } from "firebase/firestore";
import type { User } from "./types";

const getUser = async ({ documentId }: DocRequestParams) => {
  const docRef = createDocRef<User>(db, "users", documentId);
  return await getDoc(docRef);
};

const getUsers = async () => {
  const collectionRef = createCollectionRef<User>(db, "users");
  return await getDocs(collectionRef);
};

export { getUser, getUsers };
