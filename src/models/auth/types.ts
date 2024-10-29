import type { AuthErrorCodes } from "firebase/auth";

type FirebaseAuthError = {
  code: (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes];
  name: "FirebaseError";
};

export type { FirebaseAuthError };
