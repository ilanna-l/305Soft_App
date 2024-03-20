/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const generateHouseholdID = () => {
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * abc.length);
    id += abc[randomIndex];
  }
  return id;
};

const generatedIDList = [];

const checkHouseholdID = () => {
  let id = generateHouseholdID();
  while (generatedIDList.includes(id)) {
    id = generateHouseholdID();
  }
  generatedIDList.push(id);
  return id;
};

exports.generateCode = onRequest((request, response) => {
  const id = checkHouseholdID();
  response.send({HouseholdID: id});
});
