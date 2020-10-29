import { useState, useEffect } from "react";

import { authService } from "utils/firebaseInstance";
import AppRouter from "components/route/Router";

function App() {
  const [userDataObject, setUserDataObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      // check if the user is logged in (user object should not be null)
      if (user) {
        setUserDataObject({
          uid: user.uid,
        });
      }
    });
  }, []);

  return (
    <>
      <AppRouter userDataObject={userDataObject} />
    </>
  );
}

export default App;
