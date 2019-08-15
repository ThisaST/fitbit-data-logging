import history from "./history";

const AuthHandler = (authCode: string) => {
  if (authCode !== "") {
    history.push("/home");
  }
};

export default AuthHandler;
