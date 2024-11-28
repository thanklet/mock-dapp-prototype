import type { LoginSchema, SignUpSchema } from "@/features/auth/validation";
import { auth } from "@/lib/firebase";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "../users";
import type { FirebaseAuthError } from "./types";

const isFirebaseAuthError = (error: unknown): error is FirebaseAuthError => {
  const firebaseAuthError = error as FirebaseAuthError;

  return (
    firebaseAuthError.name === "FirebaseError" &&
    Object.values(AuthErrorCodes).includes(firebaseAuthError.code)
  );
};

const getUserCredential = async ({ email, password }: LoginSchema) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    return credential;
  } catch (error) {
    if (isFirebaseAuthError(error)) {
      if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        return null;
      }
    }
    throw error;
  }
};

const signUp = async ({
  email,
  password,
  username,
}: Omit<SignUpSchema, "termsAndConditions">) => {
  // NOTE: Cloud Firestoreの挙動として、同じURLを使うとキャッシュされた同じ画像が返ってくる。
  //       アバターが全員同じになると見栄えが悪いので、ランダムなIDを含むURLで画像を取得する。
  const imageId = Math.floor(Math.random() * 1000);
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    createUser({
      documentId: credential.user.uid,
      user: {
        image_path: `https://picsum.photos/id/${imageId}/200/300`,
        name: username,
        thanks: 0,
        email: credential.user.email || email,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getUserCredential, signUp, isFirebaseAuthError };
