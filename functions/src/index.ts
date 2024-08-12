import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { logger } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

initializeApp();
const messaging = getMessaging();

export const notifySelf = onRequest({ cors: true }, (request, response) => {
  const registrationToken = request.body.fcm_token;
  const notificationText = request.body.message;

  const message = {
    data: {
      text: notificationText,
    },
    token: registrationToken,
  };

  messaging
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });

  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
