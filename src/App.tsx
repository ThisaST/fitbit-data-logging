import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

import "./App.css";
import { clientId, clientSecret } from "./config";
import { fetchData } from "./api/api";
import { base64Encoding } from "./util/base64Encoding";
import ActivityLogging from "./modules/activityLogging/component/activityLogging";

interface IState {
  authCode: string;
}
const openAuthenticationUsingFitbit = () => {
  const url =
    "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22DNVH&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=31536000";
  window.open(url, "_self");
};

const getParameterByName = (name: string, url: string) => {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const getAccessTokenFromFitbit = (authCode: string) => {
  const basicAuthCode = base64Encoding(clientId + ":" + clientSecret);
  const accessTokenRequestUrl =
    "https://api.fitbit.com/oauth2/token?client_id=" +
    clientId +
    "&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F&grant_type=authorization_code&code=" +
    authCode;
  fetchData(accessTokenRequestUrl, "POST", basicAuthCode);
};
const App: React.FC = () => {
  const [authCode, setAuthCode] = useState("");
  useEffect(() => {
    const url = window.location.href;
    // const authCodes = getParameterByName("code", url);
    // if (authCodes) {
    //   setAuthCode(authCodes);
    // }
    // const basicAuthCode = base64Encoding(clientId + ":" + clientSecret);
    // const accessTokenRequestUrl =
    //   "https://api.fitbit.com/oauth2/token?client_id=" +
    //   clientId +
    //   "&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F&grant_type=authorization_code&code=" +
    //   authCodes;
    // fetchData(accessTokenRequestUrl, "POST", basicAuthCode);
    // const accessToken = getAccessToken();
    // console.log(accessToken);
  }, [authCode]);
  return (
    <div className="App">
      <header className="App-header">
        {/* <Button
          color="primary"
          className="Button"
          onClick={() => getAccessTokenFromFitbit(authCode)}
          style={{ margin: 20 }}
        >
          Get Access Token
        </Button> */}
        <ActivityLogging />
      </header>
    </div>
  );
};

export default App;
