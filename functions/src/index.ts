/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { logger } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

const app = initializeApp();
const messaging = getMessaging();
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const notifySelf = onRequest({ cors: true }, (request, response) => {
  console.log(request.method === "post");

  console.log(request.body);
  // This registration token comes from the client FCM SDKs.
  const registrationToken = request.body.fcm_token;
  const notificationText = request.body.message;

  const message = {
    data: {
      score: "850",
      time: "2:45",
      text: notificationText,
    },
    token: registrationToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  console.log("here");

  console.log("app =======================\n", app);
  console.log("messaging =======================\n", messaging);

  messaging
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
      console.log("then here");
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      console.log("actually here");
    });
  console.log("HOW> here");

  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
