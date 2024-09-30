import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  type CollectionReference,
  type DocumentData,
  type Firestore,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  collection,
  doc,
} from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

/**
 * client
 */
const firebaseConfig = {
  apiKey: "AIzaSyCT6QLV5aPWJRDcpYtFwt323uCDAje_pxo",
  authDomain: "thanklet-73677.firebaseapp.com",
  projectId: "thanklet-73677",
  storageBucket: "thanklet-73677.appspot.com",
  messagingSenderId: "700135753531",
  appId: "1:700135753531:web:5bc6b93c9be6690c10d91e",
  measurementId: "G-DL9NT18EET",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const functions = getFunctions(app);

/**
 * converter
 */
const createFirestoreDataConverter = <
  T extends DocumentData,
>(): FirestoreDataConverter<T> => {
  return {
    toFirestore(data: T): DocumentData {
      return data;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<T>): T {
      return snapshot.data();
    },
  };
};

const createDocRef = <T extends DocumentData>(
  db: Firestore,
  collectionPath: string,
  docPath?: string,
) => {
  if (!docPath) {
    return doc(db, collectionPath).withConverter(
      createFirestoreDataConverter<T>(),
    );
  }
  return doc(db, collectionPath, docPath).withConverter(
    createFirestoreDataConverter<T>(),
  );
};

const createCollectionRef = <T extends DocumentData>(
  db: Firestore,
  collectionPath: string,
): CollectionReference<T> => {
  return collection(db, collectionPath).withConverter(
    createFirestoreDataConverter<T>(),
  );
};

export {
  analytics,
  db,
  storage,
  auth,
  functions,
  createFirestoreDataConverter,
  createDocRef,
  createCollectionRef,
};
