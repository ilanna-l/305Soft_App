# Firebase Cloud Functions
Our application uses many Firebase cloud functions in order to allow our app to communicate with the backend database, retrieving whatever information is needed in order to perform a given function on the app. 

## Cloud Function Interaction
These are the main functions responsible for interaction with the backend database. We did not use any other web APIs, besides this self writen API.

### Creating New Household
One of the main functionalities of our app is the ability to sync information between multiple users in a given household. We do this by generating a 6 character alphanumeric string to be used as a household ID, and using this household ID for all the fllowing functions. There are a few functions involved in the household ID generation process.

#### generateHouseholdID
Function to generate household ID - generates a 6 character alphanumeric string to be used as a household ID

**Parameter**: none

**Return**: 6 character alphanumeric string

#### checkHouseholdID 
Function to check household ID - checks if the ID exists in the database and returns a boolean

**Parameter**: none

**Return**: household ID

Generates a household ID and checks if it already exists in the database

#### doesIDExist 
Function to check if ID exists

**Parameter**: ref, id

**Return**: boolean

#### getHouseholdName 
Function to create household - generates new household ID and validates it using chechHouseholdID function, Sets the household name in the database and returns the household ID and name. Calls all previous functions in order to completely validate that a valid ID is generated

**URL**: https://us-central1-soft-app-4f7f9.cloudfunctions.net/getHouseholdName?name=householdName

**Parameter**: name

**Return**: HouseholdID and HouseholdName

### Retrieving Chores, Groceries, Bills
In our app, one of our main functionalities is the ability to showcase the same list of chores, bills, groceries for all users in a given household. This is done using multiple getter functions, which parse the database and return the results in a JSON format. These functions can be invoked by sending a GET request to the Web API

#### getChores
Function to get chores - takes in a household ID and returns a list of chores in the household

**URL**: https://us-central1-soft-app-4f7f9.cloudfunctions.net/getChores?id=HouseholdID

**Parameter**: householdID

**Return**: JSON list of chores


#### getGroceries
Function to get groceries - takes in a household ID and returns a list of groceries in the household

**URL**: https://us-central1-soft-app-4f7f9.cloudfunctions.net/getGroceries?id=HouseholdID

**Parameter**: householdID

**Return**: JSON list of groceries



#### getExpenses 

Function to get bills - takes in a household ID and returns a list of bills in the household

**URL**: https://us-central1-soft-app-4f7f9.cloudfunctions.net/getExpenses?id=HouseholdID

**Parameter**: householdID

Return: JSON list of bills



### Adding New Chores, Groceries, Bills
Another functionality of the app is the ability to add any additional chores to the central household database. In this case, we utilized many functions that take in a JSON list of objects, which tells the database exactly what information needs to be stored. These functions can be invoked by sending a POST request to the Web API. 

#### addChore
Function to add chores - takes in a household ID and chore data and adds the chore to the household

**URL**: https://us-central1-soft-app-4f7f9.cloudfunctions.net/addChore?id=testHouseholdID

**Parameter**: householdID, choreData

**Return**: JSON object of chore

Tested with the following JSON objects:

Using: https://reqbin.com/

`{"id":"Chore","assignedUsers":"user1","isComplete":false,"name":"Take out Trash"}`

Status: 200 (OK) Time: 89 ms Size: 0.09 kb

Returns:
```
{
    "id": "Chore45",
    "assignedUsers": "user3",
    "isComplete": false,
    "name": "Random Chore"
}
```

`{"id":"Chore","assignedUsers":"user1, user2","description":"Wash the dishes!","effortLevel":3,"isComplete":false,"name":"Wash Dishes"}`

Status: 409 (Conflict) Time: 89 ms Size: 0.02 kb

Returns: Chore ID already exists (expected)

#### addGroceries 
Function to add groceries - takes in a household ID and groceries data and adds the groceries to the household

**URL**: https://us-central1-soft-app-4f7f9.cloudfunctions.net/addGroceries?id=testHouseholdID

**Parameter**: householdID, groceriesData

**Return**: JSON object of groceries

Tested with the following JSON objects:

Using: https://reqbin.com/

`{"id":"GroceryItem","assignedUser":"user1, user2","cost":3,"isComplete":false,"name":"Paper Towels"}`

Status: 200 (OK) Time: 489 ms Size: 0.10 kb

Returns:
```
{
    "id": "GroceryItem",
    "assignedUser": "user1, user2",
    "cost": 3,
    "isComplete": false,
    "name": "Paper Towels"
}
```

`{"id":"GroceryItem2","assignedUser":"user1","cost":22,"isComplete":true,"name":"Erewhon Smoothie"}`

Status: 200 (OK) Time: 100 ms Size: 0.10 kb

Returns:
```
{
    "id": "GroceryItem2",
    "assignedUser": "user1",
    "cost": 22,
    "isComplete": true,
    "name": "Erewhon Smoothie "
}
```

`{"id":"GroceryItem","assignedUser":"user2","cost":10,"isComplete":false,"name":"Paper Plates"}`

Status: 409 (Conflict) Time: 81 ms Size: 0.03 kb

Returns: Groceries ID already exists (expected)

#### addBills 
Function to add bills - takes in a household ID and bill data and adds the bill to the household

**URL**: https://us-central1-soft-app-4f7f9.cloudfunctions.net/addBills?id=testHouseholdID

**Parameter**: householdID, billData

**Return**: JSON object of bills

Tested with the following JSON objects:

Using: https://reqbin.com/

`{"id":"Bill","assignedUsers":"user1, user2","cost":147,"description":"Electricity bill","due":"3/12/2024","isComplete":true,"name":"Electricity Bill"}`

Status: 200 (OK) Time: 119 ms Size: 0.15 kb

Returns:
```
{
    "id": "Bill",
    "assignedUsers": "user1, user2",
    "cost": 147,
    "description": "Electricity bill",
    "due": "3/12/2024",
    "isComplete": true,
    "name": "Electricity Bill"
}
```

`{"id":"Rent","assignedUsers":"user1, user2","cost":800,"description":"Rent for the month","isComplete":false,"name":"Rent"}`

Status: 200 (OK) Time: 86 ms Size: 0.12 kb

Returns:
```
{
    "id": "Rent",
    "assignedUsers": "user1, user2",
    "cost": 800,
    "description": "Rent for the month",
    "isComplete": false,
    "name": "Rent"
}
```

`{"id":"Bill","assignedUsers":"user1, user2","cost":273,"description":"Water bill","due":"3/12/2024","isComplete":false,"name":"Water Bill"}`

Status: 409 (Conflict) Time: 78 ms Size: 0.02 kb

Returns: Bill ID already exists (expected)

