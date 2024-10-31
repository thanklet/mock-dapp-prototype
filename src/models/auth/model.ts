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
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    createUser({
      documentId: credential.user.uid,
      user: {
        image_path: "https://picsum.photos/200/300",
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
