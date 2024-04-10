/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

/* eslint-disable max-len*/

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();
const database = admin.database();


/*
Function to generate household ID
Parameter: none
Return: 6 character alphanumeric string

Generates a 6 character alphanumeric string to be used as a household ID
*/
const generateHouseholdID = () => {
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * abc.length);
    id += abc[randomIndex];
  }
  return id;
};

/*
Function to check household ID
Parameter: none
Return: household ID

Generates a household ID and checks if it already exists in the database
*/
const checkHouseholdID = async () => {
  let id = generateHouseholdID();
  const householdIdsRef = database.ref("Households");

  while (await doesIDExist(householdIdsRef, id)) {
    id = generateHouseholdID();
  }

  await householdIdsRef.push(id);
  return id;
};

/*
Function to check if ID exists
Parameter: ref, id
Return: boolean

Checks if the ID exists in the database and returns a boolean
*/
const doesIDExist = async (ref, id) => {
  const snapshot = await ref.once("value");
  return snapshot.hasChild(id);
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

  // Check if householdID exists in the database
  const householdIdsRef = database.ref("Households");
  if (!(await doesIDExist(householdIdsRef, id))) {
    response.status(404).send("Household ID not found");
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

  // Check if householdID exists in the database
  const householdIdsRef = database.ref("Households");
  if (!(await doesIDExist(householdIdsRef, id))) {
    response.status(404).send("Household ID not found");
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

  // Check if householdID exists in the database
  const householdIdsRef = database.ref("Households");
  if (!(await doesIDExist(householdIdsRef, id))) {
    response.status(404).send("Household ID not found");
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

/*
Function to add chores
URL:https://us-central1-soft-app-4f7f9.cloudfunctions.net/addChore?id=testHouseholdID
Parameter: householdID, choreData
Return: JSON object of chore

Tested with the following JSON object:
{"id":"Chore","assignedUsers":"user1","isComplete":false,"name":"Take out Trash"}
Using: https://reqbin.com/
Status: 200 (OK) Time: 89 ms Size: 0.09 kb
Returns:
{
    "id": "Chore45",
    "assignedUsers": "user3",
    "isComplete": false,
    "name": "Random Chore"
}

{"id":"Chore","assignedUsers":"user1, user2","description":"Wash the dishes!","effortLevel":3,"isComplete":false,"name":"Wash Dishes"}
Status: 409 (Conflict) Time: 89 ms Size: 0.02 kb
Returns: Chore ID already exists (expected)

Takes in a household ID and chore data and adds the chore to the household
*/
exports.addChore = onRequest(async (request, response) => {
  const id = request.query.id;
  const choreData = request.body;

  // Check if householdId is provided
  if (!id) {
    response.status(400).send("Household ID is required");
    return;
  }

  // Check if householdID exists in the database
  const householdIdsRef = database.ref("Households");
  if (!(await doesIDExist(householdIdsRef, id))) {
    response.status(404).send("Household ID not found");
    return;
  }

  try {
    const choreRef = database.ref("Households").child(id).child("Chores").child(choreData.id);

    // Check if the chore ID already exists
    const snapshot = await choreRef.once("value");
    if (snapshot.exists()) {
      response.status(409).send("Chore ID already exists");
      return;
    }

    await choreRef.set(choreData);
    response.send(choreData);
  } catch (error) {
    console.error("Error adding chore:", error);
    response.status(500).send("Error adding chore");
  }
});
