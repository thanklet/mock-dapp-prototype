import type { LoginSchema } from "@/features/auth/validation";
import { auth } from "@/lib/firebase";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
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

export { getUserCredential };
