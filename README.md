## Project overview
`userDataObject` is set to `null` when the user is not logged in. This state will receive an object once the user signs up or logs in. Once the user is authenticated, the user will be automatically redirected to the main page and will not have access to the auth page as there is no need.
**update** `userDtaObject` is being set in the App.js atm. Planning on using a context api so the state does not need to be passed down parent to child directly.

**
material-ui is not well kept up with the React devs. It will throw an error message when run development mode in local due to having the Strict mode tag around the <App />. According to [React documentation](https://reactjs.org/docs/strict-mode.html), Strict mode checks are run in development mode only; they do not impact the production build.