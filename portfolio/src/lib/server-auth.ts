import type { Auth, DecodedIdToken } from "firebase-admin/auth";

export async function decodeIdToken(auth: Auth, idToken: string): Promise<DecodedIdToken> {
  if (!idToken) {
    throw new Error("Missing Firebase auth token.");
  }

  return auth.verifyIdToken(idToken);
}
