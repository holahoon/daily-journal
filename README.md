# MyBook :orange_book:	

> A **daily journal web app** developed by **DK**

## Demo

**[MyBook link](https://my-book-fe5fe.web.app/)**

Here's a sample email and password to use:  
email: dk@email.com  
pass: dk123123  

## General Info

MyBook web application was developed for writing daily journal.
The user must sign up/sign in in order to fully use the application.
The main focus of this project was to use [React.js](https://reactjs.org/) to build n SPA application and [Redux](https://redux.js.org/) to manage data state. I didn't spend too much time on styling it using CSS so I've decided to use [Material-ui](https://material-ui.com/) to use its style components along with tweaks here and there.

## How the the app works

Once you have visited the [app](https://my-book-fe5fe.web.app/), It'll ask to sign up if you haven't. All fields must be filled out with password being at least 6 characters/digits long. Once signed up or signed in, you will be directed to the main page to start writing a new journal. When clicking on the Add New button, it'll direct to /write page which will allow the user to write. Upon clicking on save, it'll save the journal and will redirect back to the main page which will automatically display the email that's been written by the user along with the date, time and first few sentences. When clicking on the edit button, it'll also direct the user to the /write page to allow the user to edit or just leave as is. Once clicking on the delete button, it'll pop up a dialog to ensure that the user agrees to delete the selected journal.

## How the code is structured

- **User authentication** is handled by `context api` to wrap the most parent container and `useReducer` hook to initialize the user auth state. The auth state received an object with `uid` and `displayName`. This allows all the child components to be able to access the global state to render conditionally. [Auth.js](src/containers/Auth.js) handles all the sign in/up actions.
  The auth state updates the [Navigation.js](src/containers/Navigation.js) which imports [Authentication.js](src/components/authentication/Authentication.js) that will conditionally render the user name and log out button or log in button.

- **Data** is being handled using Redux. Redux `reducer` gets, writes, updates and deletes by calling its appropriate `action creators`. Using `useEffect` hook in [App.js](src/App.js) dispatches an action to get journalsData from Firebase. This was a better option to get data on component mount cycle instead in the [Home.js](src/containers/Home.js) because it will dispatch actions on every render when the user navigates back to the main page. [Write.js](src/containers/Write.js) handles two dispatch actions - write and edit. Using `react-router-dom`, when the url path is `/write`, it writes a new journal by dispatch its action and when the url path contains `uid` after `/write/`, it dispatches an edit action. In [ContentCard.js](src/components/contentCard/ContentCard.js), delete action dispatches to delete the data.  
[Firebase](https://firebase.google.com/) was used to handle all of the backend using its provided `authentication` and `cloud firestore`. I have temporarily only allowed to user to sign in/up by creating email and password for now. I'm using Firebase cloud firestore to better structure data. The structure is as folllows:
`users(collection)` -> `userId(docs)` -> `daily-journals(collection)` -> `journals(docs)`


## Tech stacks

- [React.js](https://reactjs.org/)
- [Redux-Redux](https://react-redux.js.org/)
- [Redux](https://redux.js.org/)
- [Redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [Material-ui](https://material-ui.com/)
- [Firebase](https://firebase.google.com/)

## Setup

If cloned the app or have it downloaded and have the terminal on the repo, to install all of its needed `dependencies` in the local `node_modules` folder.
```
npm install
```
Run the app on the locally [http://localhost:3000](http://localhost:3000)/
```
npm start
```

## Deployment

:raised_hands: Deployed on [Firebase](https://firebase.google.com/) on November 13th, 2020 
- [Firebase](https://firebase.google.com/) `cloud firestore` rule is configured to allow anyone to read and write as long as they are logged in.
- [Google APIs & Services credentials](https://console.developers.google.com/apis/credentials) to protect api keys.