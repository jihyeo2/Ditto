import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import userInfoApi from "../api/userInfo";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (authToken) => {
    console.log("api started");
    const result = await userInfoApi.show(authToken);
    // console.log("rece", result.data); 401 error
    console.log("api ended");
    setUser(user);
    console.log(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
