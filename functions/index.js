/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
// me Project
// change region
setGlobalOptions({
  region: "asia-northeast1",
  memory: "1GB",
  concurrency: 40,
});

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.webhook = onRequest((request, response) => {
  console.log(JSON.stringify(request.body));
  response.send("Hello from webhook!!!");
  const events = request.body.events;
  for (const event of events) {
    switch (event.type) {
      case "message":
        const msg = event.message.text;
        if (msg === "hello") {
          console.log("Hooley");
        } else {
          console.log("nope ");
        }
        break;
      default:
    }
  }
  return response.end();
});
