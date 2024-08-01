import { initializeApp } from "firebase/app";
import {
  arrayUnion,
  connectFirestoreEmulator,
  doc,
  DocumentData,
  getDoc,
  getFirestore,
  onSnapshot,
  runTransaction,
  setDoc,
} from "firebase/firestore";

import { firebaseConfig } from "./firebase";
import { getUserId } from "../utils";
import { Notification } from "../types/Notification";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

if (import.meta.env.MODE === "development") {
  connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
}

const userId = getUserId();

const userDocRef = doc(firestore, "users", userId);

export async function addUserNotification(notification: Notification) {
  try {
    await runTransaction(firestore, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);

      if (!userDoc.exists()) {
        throw new Error(`User document with userId ${userId} does not exist.`);
      }

      transaction.update(userDocRef, {
        notifications: arrayUnion(notification),
      });
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getUserDocument(): Promise<DocumentData | undefined> {
  try {
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log(userDoc.data());
      const userData = userDoc.data();
      console.log(userData);
      return userData || undefined;
    }
  } catch (err) {
    console.log(err);
  }
}

export const subscribeToNotifications = (
  callback: (notifications: Notification[]) => void
) => {
  try {
    setDoc(
      doc(firestore, "users", userId),
      {
        userId,
      },
      { merge: true }
    );
  } catch (err) {
    console.log("Error creating/updating user: ", err);
  }
  return onSnapshot(userDocRef, (querySnapshot) => {
    const doc = querySnapshot.data();

    const notifications = doc?.notifications?.map(
      (notification: Notification) => ({
        ...notification,
      })
    ) as Notification[];
    callback(notifications || []);
  });
};

export const markAsRead = async (notificationId: string) => {
  try {
    await runTransaction(firestore, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);

      if (!userDoc.exists()) {
        throw new Error(`User document with userId ${userId} does not exist.`);
      }

      const userData = userDoc.data();
      const updateIndex = userData.notifications.findIndex(
        (notification: Notification) => notification.id === notificationId
      );

      const notifications = [...userData.notifications];
      notifications.at(updateIndex).read = true;

      transaction.update(userDocRef, {
        notifications,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
