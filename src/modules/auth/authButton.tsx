import React, { useEffect } from "react";
import { Button } from "reactstrap";
import { clientId, clientSecret } from "../../config";
import { base64Encoding } from "../../util/base64Encoding";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, getAuthenticationCode } from "./actions/actions";
import { ApplicationState } from "../../configureStore";
import history from "../../service/history";

const openAuthenticationUsingFitbit = () => {
  const url =
    "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22DNVH&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=31536000";
  window.open(url, "_self");
};

const AuthButton: React.FC = () => {

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(({ auth }: ApplicationState) => ({
    authCodes: auth ? auth.isAuthenticated : false
  }));

  const getAccessTokenFromFitbit = (authCode: string) => {
    const basicAuthCode = base64Encoding(clientId + ":" + clientSecret);
    const accessTokenRequestUrl =
      "https://api.fitbit.com/oauth2/token?client_id=" +
      clientId +
      "&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F&grant_type=authorization_code&code=" +
      authCode;
    dispatch(
      getAccessToken({ url: accessTokenRequestUrl, authCode: basicAuthCode })
    );
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

  const updateAuth = async (authCode: string) => {
    if (authCode !== "" && !isAuthenticated.authCodes) {
      await dispatch(getAuthenticationCode(authCode));
      await getAccessTokenFromFitbit(authCode);
    }

    setTimeout(() => {
      if (isAuthenticated.authCodes) {
        history.push("/home");
      }
    }, 1000);
  };

  useEffect(() => {
    const url = window.location.href;
    const authCode = getParameterByName("code", url) || "";
    updateAuth(authCode);
  }, [isAuthenticated.authCodes]);

  return (
    <>
      <Button
        color="primary"
        onClick={openAuthenticationUsingFitbit}
        disabled={isAuthenticated ? isAuthenticated.authCodes : false}
      >
        Authentication
      </Button>
    </>
  );
};
export default AuthButton;
