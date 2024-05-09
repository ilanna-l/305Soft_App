# Thunkable Blocks
For the front end of our application, we decided to create the UI using Thunkable's drag and drop code platform. For the Thunkable platform, we are able to add components to the UI such as buttons, labels, screens, and more. With the drag and drop code blocks, we are able to make these UI components interactive. 

# Thunkable UI
An example of buttons and labels featured in Thunkable's UI can be seen here:
<img width="484" alt="Screenshot 2024-05-08 at 9 15 52 PM" src="https://github.com/ilanna-l/305Soft_App/assets/113469032/5c5364ed-b350-4356-ab43-10dc19ad58ab">
There are many more components such as lists to display data, imagery, and even animations. 

# Thunkable Drag and Drop Code
Rather than typing hundreds of lines of code, Thunkable reduces the coder's fatigue and offers a simple drag and drop method to apply code to UI components. 

For example, when the user clicks the sign in or sign up button, they are directed to the appropriate screen:

## More features with Thunkable's Drag and Drop Code
Our app features complex functions utilizing the drag and drop code blocks featured in Thunkable. 

## signing in
Here is a block code function for signing the user into the app:

<img width="514" alt="Screenshot 2024-05-08 at 9 10 05 PM" src="https://github.com/ilanna-l/305Soft_App/assets/113469032/ecb49230-8ae3-4778-9033-7433058d8719">

## accessing firebase through Thunkable's drag and drop blocks
The firebase NoSQL database stores values as objects with keys and values. This can be utilized in the Thunkable blocks to access certain elements, such as checking whether the user is already associated with a household when they try navigating to the "Select Household" screen.

<img width="527" alt="Screenshot 2024-05-08 at 9 10 15 PM" src="https://github.com/ilanna-l/305Soft_App/assets/113469032/be048a46-d823-4160-aaf8-5d463c650902">

## calling cloud functions in Thunkable
Cloud functions are written using node.js and are called in our code for various reasons, such as generating a random Household ID for when a user creates a household. API's are used to generate data which is returned as a JSON, where the information is retrieved and used in the Thunkable block code. 

Here is an example of generating a random Household ID:

<img width="714" alt="Screenshot 2024-05-08 at 9 10 22 PM" src="https://github.com/ilanna-l/305Soft_App/assets/113469032/dd3d54ff-25cd-4668-bddf-b96e2712eded">

## creating objects in the Firebase Database through drag and drop

<img width="578" alt="Screenshot 2024-05-08 at 9 19 10 PM" src="https://github.com/ilanna-l/305Soft_App/assets/113469032/9f7b50d6-7594-428f-9696-71b482452566">


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

