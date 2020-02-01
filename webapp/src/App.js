import React, { useState, useEffect } from 'react';
import './css/compiled-styles.css';
import Oidc from "oidc-client";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import FinishSignIn from './components/oidc/FinishSignIn';

let config = {
  authority: "http://localhost:5000",
  client_id: "webapp",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile ra-api",
  post_logout_redirect_uri: "http://localhost:3000/",
};

let mgr = new Oidc.UserManager(config);
console.log("user manager created",mgr);

function App() {
  const [responseText, setResponseText] = useState("");
  const [receivedToken, setReceivedToken] = useState("");
  function login() {
    mgr.signinRedirect();
  }
  function logout() {
    mgr.signoutRedirect();
  }
  async function api() {
    const usr = await mgr.getUser();
    try {
      let requestData = {};
      if (usr)
        requestData.headers = { "Authorization": `Bearer ${usr.access_token}` };
      const response = await fetch("http://localhost:8080/complaint/5e35ae2d0c88bd01dcc4d552", requestData);

      let result;
      try {
        result = await response.json();
        result = JSON.stringify(result, null, 4);
      } catch (jsonErr) {
        result = jsonErr.message;
      }

      setResponseText(`HTTP ${response.status} (${response.statusText}):\n${result}`);
    } catch (err) {
      setResponseText(`FETCH ERROR: ${err.message}`);
    }
  }

  useEffect(() => {
    (async () => {
      const usr = await mgr.getUser();
      if (usr)
        setReceivedToken(usr.access_token);
      else
        setReceivedToken("Not logged in");
    })();
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <form>
            <button type="button" className="p-2 m-4 border-2 border-blue-700 bg-blue-400 text-gray-200 rounded-lg" onClick={login}>Login!</button>
            <button type="button" className="p-2 m-4 border-2 border-blue-700 bg-blue-400 text-gray-200 rounded-lg" onClick={logout}>Logout!</button>
            <button type="button" className="p-2 m-4 border-2 border-blue-700 bg-blue-400 text-gray-200 rounded-lg" onClick={api}>WEB CALL!</button>
          </form>
          <div className="border-2 border-gray-600 rounded-xl bg-gray-300">
            <pre>{receivedToken}</pre>
          </div>
          <div className="border-2 border-blue-600 rounded-xl bg-blue-300">
            <pre>{responseText}</pre>
          </div>
        </Route>
        <Route path="/callback">
          <FinishSignIn />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
