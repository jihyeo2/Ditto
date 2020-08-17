import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import userInfoApi from "../api/userInfo";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (authToken) => {
    const result = await userInfoApi.show(authToken);
    setUser(result.data);
    console.log("after setting user", result.data);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
