import { useState, useEffect, createContext } from "react";
import { GetCurrentUserApi } from "../utils/api/apiCalls/UserApi";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticaUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoadingAuth(false);
        return;
      }

      try {
        const response = await GetCurrentUserApi();
        console.log("se inicio sesion");
        navigate("/");
        setAuth(response.data.userSession);
      } catch (error) {
        setAuth({});
      } finally {
        setLoadingAuth(false);
      }
    };

    authenticaUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, loadingAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
