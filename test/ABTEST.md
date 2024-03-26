## A/B 1 -Ilanna-
**A/B Test Name:** Increased App Navigation
**User Story Number:** US4 Golden Path
**Metric (from the HEART grid):** Time spent on secondary pages and interaction with different elements
**Hypothestis:** We have designed our user's dashboard pages to highlight upcoming bills and chores specific to them. While this design is helpful to the user we realize that this may lead to less traffic on our secondary bills, chores, and list screens. We want to increase user interactivity with these screen and belive that adding organized navigation buttons across the user dashboard will increase this traffic to our other pages. We are proposing a navigation bar at the bottom of our main page and a side pop up menu both of which display buttons to each page can be accessed anywhere on the app.

**Experiment:** For this experiment, we will allocate 50% of our user base to the experimental group (Variation B) and the remaining 50% to the control group (Variation A). This balanced allocation will allow us to effectively compare the performance of the updated navigation design with the current design while minimizing potential biases. Firebase Analytics will be configured to track the following success metrics:
- Average Time Spent on Secondary Pages (bills, chores, lists) per Session
- Frequency of Interactions with Navigation Elements
- Completion Rate of In-App Feedback Forms or Surveys

**Variations:**
Variation A (Control Group): Users in this group will continue to experience the current navigation design with no changes.
Variation B (Experimental Group): Users in this group will experience the updated navigation design with organized navigation buttons placed at the bottom of the main page and a side pop-up menu accessible from anywhere in the app.

## A/B 2 -Jenny-
**A/B Test Name:** Ease of Household Creation 
**User Story Number:** US5 Household Account Linking 
**Metric (from the HEART grid):** Adoption - Number of households being created
**Hypothestis:** We have designed the household creation process to be straightforward, generating a household ID and prompting the user for a name upon household creation. However, this process follows two screens, and it may be more beneficial for users to click on just one screen as opposed to two when creating a household, which may lead to more users wanting to create households. 

**Experiment:** For this experiment, we will allocate 50% of the user base to the experimental group while leaving 50% in the control group. This balanced allocation will allow us to effectively compare the metrics obtained by the two groups, specifically the usage of the cloud function "createHousehold". Using Google's built in cloud functions console, we can create two seperate cloud functions for the two groups, and track usage for both on Firebase. 

## A/B 3 -Mani-
A/B Test Name: User Feedback 
User Story Number: US4: Golden Path
Metric (from the HEART grid): Happiness 

Hypothesis: An app with customizable UI features is ideal to satisfy users in general. If our app does not have some sort of features that users can change for their version of the interface (their accounts), this might deter current and even newer users from using the app. If we were to add different customization options, like different interface colors or even individual avatars that users can choose from, it would be beneficial for the longevity of our app. We propose adding these options to the app settings so users can have individuality.

Experiment: For this experiment, we can allocate 50% of our user base to a version of our app with no customizable options (Variation A), while the remaining 50% will be able to use a different version with more customizable options (Variation B). This will allow us to measure the satisfaction levels of our users on whether having customizable options is suitable for the app or not. 

- User app ratings
- User Feedback
- How often app settings are viewed/clicked 

Variations: 
    Variation A (No Customization): The app version that is available to users will not have the opportunity to use customization UI features.
    Variation B (Customization): The app version that is available to users will have the opportunity to use customization UI features.


## A/B 4 -Angel-
**A/B Test Name:** 
**User Story Number:**
**Metric (from the HEART grid):**
**Hypothestis:**

**Experiment:**

**Variations:**

## A/B 5 -Justin_
**A/B Test Name:** Streamline Use
**User Story Number:** US4: Golden Path
**Metric (from the HEART grid):** Retention
**Hypothestis:** The app utilizes many different screens and lists that the user has to interact with, which can cause mental fatigue and decrease user retnetion. If we were to streamline the navigation in a way that everything was available from a single screen by use of drop down menus, we may be able to increase user retention as ease of use goes up. However, the issue here involves streamlining it while retaining diverse functionality. We propose condensing the chore pages down to a single page with drop down menus that can be easily toggled and do not take up the full screen. 

**Experiment:**  Allocate 20% of user base our drop down screen while keeping the other 80% on our default screen. Depending on the satisfaction of the 20% we can increase and tweak the drop down group until we are satisfied or decide it is less intuitive than we thought and scrap the idea. We can measure success by:
- Measuring average churn rate
- seeing how much time users spend on one page
- How often the app is opened

**Variations:** Variation A (Control Group): Users in this group will continue to experience the current chores screen with no changes.
Variation B (Experimental Group): Users in this group will experience the updated chores screen with the drop down menu functionality
