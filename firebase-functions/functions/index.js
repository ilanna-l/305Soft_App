/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();
const database = admin.database();

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

exports.getHouseholdName = onRequest(async (request, response) => {
  const name = request.query.name;
  const id = checkHouseholdID();

  try {
    const ref = database.ref("Households").child(id);
    await ref.set({householdName: name});

    response.send({HouseholdID: id, HouseholdName: name});
  } catch (error) {
    console.error("Error writing to database:", error);
    response.status(500).send("Error generating ID");
  }
});
