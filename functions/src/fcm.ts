import { logger } from "firebase-functions/v1";
import { onRequest } from "firebase-functions/v2/https";
import { getMessaging } from "firebase/messaging";

export const helloWorld = onRequest((request, response) => {
  // This registration token comes from the client FCM SDKs.
  const registrationToken = "YOUR_REGISTRATION_TOKEN";

  const message = {
    data: {
      score: "850",
      time: "2:45",
    },
    token: registrationToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  console.log("here");
  console.log("now here");

  getMessaging()
    // @ts-ignore
    .send(message)
    // @ts-ignore
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
      console.log("then here");
    })
    // @ts-ignore
    .catch((error) => {
      console.log("Error sending message:", error);
      console.log("actually here");
    });
  console.log("HOW> here");

  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
