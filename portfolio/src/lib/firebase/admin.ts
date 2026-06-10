import { cert, getApps, initializeApp, getApp, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App | null = null;

function createAdminApp() {
  if (adminApp) {
    return adminApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  const credential = cert({
    projectId,
    clientEmail,
    privateKey,
  });

  adminApp = getApps().length
    ? getApp()
    : initializeApp({
        credential,
        projectId,
      });

  return adminApp;
}

export function getAdminApp() {
  return createAdminApp();
}

export function getAdminAuth() {
  const app = createAdminApp();
  return app ? getAuth(app) : null;
}

export function getAdminDb() {
  const app = createAdminApp();
  return app ? getFirestore(app) : null;
}
