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
  const [renderedTokens, setRenderedTokens] = useState("");


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
      if (usr) {
        const tokensToRender = {
          "Token Type": usr.token_type,
          "Scope": usr.scope,
          "Session": usr.session_state,
          "Access token": usr.access_token,
          "Identity token": usr.id_token,
          "Profile": JSON.stringify(usr.profile, null, 4),
        }

        const rendered = Object.getOwnPropertyNames(tokensToRender).map(propName => (
          <div key={propName} className="mt-4">
            <label>
              <span className="font-bold">{propName}</span>
              <pre className="w-full whitespace-pre-wrap break-words">{tokensToRender[propName]}</pre>
            </label>
          </div>
        ));
        setRenderedTokens(rendered);

      }

      else
        setRenderedTokens("Not logged in");
    })();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <form>
            <button type="button" className="p-2 m-4 border-2 border-blue-700 bg-blue-400 text-gray-200 rounded-lg" onClick={login}>Login!</button>
            <button type="button" className="p-2 m-4 border-2 border-blue-700 bg-blue-400 text-gray-200 rounded-lg" onClick={logout}>Logout!</button>
            <button type="button" className="p-2 m-4 border-2 border-blue-700 bg-blue-400 text-gray-200 rounded-lg" onClick={api}>WEB CALL!</button>
          </form>
          <div className="max-w-full mx-4">
            <div className="border-2 border-gray-600 rounded-xl bg-gray-300">
              {renderedTokens}
            </div>
            <div className="border-2 border-blue-600 rounded-xl bg-blue-300 mt-5">
              <pre>{responseText}</pre>
            </div>
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
