import { createCollectionRef, createDocRef, db } from "@/lib/firebase";
import type { DocRequestParams } from "@/types/api.ts";
import { getDoc, getDocs, updateDoc } from "firebase/firestore";
import type { Transaction } from "firebase/firestore";
import type { User } from "./types";

const getUser = async ({ documentId }: DocRequestParams) => {
  const docRef = createDocRef<User>(db, "users", documentId);
  return await getDoc(docRef);
};

const getUsers = async () => {
  const collectionRef = createCollectionRef<User>(db, "users");
  return await getDocs(collectionRef);
};

const updateUser = async ({
  documentId,
  user,
  transaction,
}: { documentId: string; user: Partial<User>; transaction?: Transaction }) => {
  const docRef = createDocRef<User>(db, "users", documentId);
  if (transaction) {
    return await transaction.update(docRef, user);
  }
  return await updateDoc(docRef, user);
};

export { getUser, getUsers, updateUser };
