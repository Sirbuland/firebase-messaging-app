import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

import { FIREBASE_CONFIG } from "./firebaseConfig";

initializeApp(FIREBASE_CONFIG);

export const messaging = getMessaging();
