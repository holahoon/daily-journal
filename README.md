# MyBook :orange_book:	

> A **daily journal web app** developed by **DK**

## Demo

**[MyBook link](https://my-book-fe5fe.web.app/)**

Here's a sample email and password to use:  
email: dk@email.com  
pass: dk123123  

## General Info

MyBook web application was developed for writing daily journal to keep track of my daily routine/special events.
The user must sign up/sign in in order to fully use the application.
The main focus of this project was to use [React.js](https://reactjs.org/) to build n SPA application and [Redux](https://redux.js.org/) to manage data state. I didn't spend too much time on styling it using CSS so I've decided to use [Material-ui](https://material-ui.com/) to use its style components along with tweaks here and there.
The data is being managed as follows:
- **Authentication**: `Context API` - using `useReducer` hook to handle different authentication actions. This allows all components to have access to the authentication state in order to dynamically render.
- **Firebase data**: `redux store` - using redux `reducer` to trigger various types of actions by calling an appropriate `actionCreator`. This handles all of the data interactions - Create, Read, Update, Delete.
  
This was a personal choice to use two different types state management logic because first, I wanted to have an experience on using both. And secondly, authentication status doesn't normally change too often which is very suitable for using `context api` but frequent updates on data is suited for `Redux`. I was able to visually keep track of the data actions being created and called using [Redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension).

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