import './SignIn.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import App from './App'; 

function SignIn() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log("userObject",userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;

  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "811829099303-d8sbmb9ost5ts5g5398ljcj47uojc32h.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );


    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      {Object.keys(user).length !== 0 &&
        <div>
          <img src={user.picture} alt="User profile"></img>
          <h3>{user.name}</h3>
        </div>
      }
      {/* Conditionally render the regular app component only when the user is signed in */}
      {Object.keys(user).length !== 0 && <App  user={user}/>}
    </div>
  );
}

export default SignIn;
