import { createDocRef, db } from "@/lib/firebase";
import type { DocRequestParams } from "@/types/api.ts";
import { getDoc } from "firebase/firestore";
import type { User } from "./types";

const getUser = async ({ documentId }: DocRequestParams) => {
  const docRef = createDocRef<User>(db, "users", documentId);
  return await getDoc(docRef);
};

export { getUser };
