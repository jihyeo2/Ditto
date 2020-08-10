import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import userInfoApi from "../api/userInfo";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (authToken) => {
    const result = await userInfoApi.show(authToken);
    console.log("login result", result);
    console.log("userdata", result.data);
    setUser(result.data);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
