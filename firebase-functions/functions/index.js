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

/*
Function to create household
URL:https://us-central1-soft-app-4f7f9.cloudfunctions.net/getHouseholdName?name=householdName
Parameter: name
Return: HouseholdID and HouseholdName

Generates new household ID and validates it using chechHouseholdID function,
Sets the household name in the database and returns the household ID and name
*/
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

/*
Function to get groceries
URL:https://us-central1-soft-app-4f7f9.cloudfunctions.net/getGroceries?id=HouseholdID
Parameter: householdID
Return: JSON list of groceries

Takes in a household ID and returns a list of groceries in the household
*/
exports.getGroceries = onRequest(async (request, response) => {
  const id = request.query.id;

  // Check if householdId is provided
  if (!id) {
    response.status(400).send("Household ID is required");
  }

  try {
    const ref = database.ref("Households").child(id).child("Groceries");
    const snapshot = await ref.once("value");
    const groceries = snapshot.val();

    const groceriesList = Object.keys(groceries).map((key) => {
      return {
        id: key,
        ...groceries[key],
      };
    });

    response.send(groceriesList);
  } catch (error) {
    console.error("Error retrieving groceries:", error);
    response.status(500).send("Error retrieving groceries");
  }
});

/*
Function to get chores
URL:https://us-central1-soft-app-4f7f9.cloudfunctions.net/getChores?id=HouseholdID
Parameter: householdID
Return: JSON list of chores

Takes in a household ID and returns a list of chores in the household
*/
exports.getChores = onRequest(async (request, response) => {
  const id = request.query.id;

  // Check if householdId is provided
  if (!id) {
    response.status(400).send("Household ID is required");
  }

  try {
    const ref = database.ref("Households").child(id).child("Chores");
    const snapshot = await ref.once("value");
    const chores = snapshot.val();

    const choresList = Object.keys(chores).map((key) => {
      return {
        id: key,
        ...chores[key],
      };
    });

    response.send(choresList);
  } catch (error) {
    console.error("Error retrieving chores:", error);
    response.status(500).send("Error retrieving chores");
  }
});

/*
Function to get bills
URL:https://us-central1-soft-app-4f7f9.cloudfunctions.net/getExpenses?id=HouseholdID
Parameter: householdID
Return: JSON list of bills

Takes in a household ID and returns a list of bills in the household
*/
exports.getExpenses = onRequest(async (request, response) => {
  const id = request.query.id;

  // Check if householdId is provided
  if (!id) {
    response.status(400).send("Household ID is required");
  }

  try {
    const ref = database.ref("Households").child(id).child("Shared Expenses");
    const snapshot = await ref.once("value");
    const bills = snapshot.val();

    const billsList = Object.keys(bills).map((key) => {
      return {
        id: key,
        ...bills[key],
      };
    });

    response.send(billsList);
  } catch (error) {
    console.error("Error retrieving bills:", error);
    response.status(500).send("Error retrieving bills");
  }
});
