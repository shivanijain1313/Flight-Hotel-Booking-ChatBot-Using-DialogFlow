<a name="desc"></a>
## Content

-  [ Project Overview. ](#desc)
-  [ DialogFlow Overview. ](#overview)
-  [ Project Setup. ](#usage)
   - [ Agent Setup. ](#agent)
   - [ Fulfillment Code Setup. ](#fulfillment)
-  [ Bot Testing. ](#test)

<a name="desc"></a>
## Project Overview

TravelPlanner chatbot allows a user to book flights from an origin to destination for a particular date using Google Assistant. Users can also opt for hotel bookings.

**Functional Features:**
1) User can book flight from origin to destination.
2) Suggestion Chips will be provided to the user to help in selecting various options. (For suggestion chip demo, click [here](https://developers.google.com/assistant/conversational/df-asdk/rich-responses#suggestion_chips "here"))
3) Users can select travel class (business or economy) and can opt for seat booking.
4) Detect location feature is also enabled.
5) Change destination and change date option is also available.
6) Users can opt for hotel booking from the displayed hotel list.

**Flowchart:**

Below is the flowchart reflecting all the covered scenarios:

![image](https://user-images.githubusercontent.com/28806048/88623979-c3c6b080-d0c3-11ea-93fd-288c35986e5a.png)


<a name="overview"></a>
## DialogFlow Overview

For basic understanding of dialogflow, click [here](https://cloud.google.com/dialogflow/docs "here")

<a name="usage"></a>
##  Project Setup

<a name="agent"></a>
- ### Agent Setup

1. Create New Agent  **Travel Planner**.

![image](https://user-images.githubusercontent.com/28806048/88535841-50239580-d028-11ea-955c-fdb8339e7d28.png)

2. Go to the Dialogflow console and click the ⚙icon next to your Dialogflow agent name.

3. Click to Export and Import tab in the settings of your Dialogflow agent and click IMPORT FROM ZIP.
![image](https://user-images.githubusercontent.com/28806048/88536039-b1e3ff80-d028-11ea-8a09-61bcde3668d9.png)

4. Drag the  TravelPlanner.zip  file into the box and type the word IMPORT to complete the import.
![image](https://user-images.githubusercontent.com/28806048/88536120-d8099f80-d028-11ea-839d-3e70f8406ab2.png)

*Great !!  Now you have imported  your DialogFLow agents and entites :smile:*

<a name="fulfillment"></a>
- ###  Fulfillment Code Setup

1. Go to Fulfillment Tab and enable Inline Editor.
![image](https://user-images.githubusercontent.com/28806048/88536414-64b45d80-d029-11ea-9327-6da1b2ecb138.png)

2. Update index.js and package.json as per committed file.

3. Once done, click Deploy.
![image](https://user-images.githubusercontent.com/28806048/88536606-bfe65000-d029-11ea-98ce-0e8951c9ce6b.png)

<a name="test"></a>
## Bot Testing

1. Go to [Google Action Console](https://console.actions.google.com/ "Google Action Console")

2. Select Project  and Click on Test.
![image](https://user-images.githubusercontent.com/28806048/88616428-c28c8800-d0b1-11ea-85d2-8b218272e44b.png)

*Done!!! Now start chatting with your bot :smile:*

![image](https://user-images.githubusercontent.com/28806048/88616488-efd93600-d0b1-11ea-9d1d-c7e5e85ba4a2.png)

**Happy Learning :smile:**
.
