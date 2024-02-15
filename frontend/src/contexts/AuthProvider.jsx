import { useState, useEffect, createContext } from "react";
import { GetCurrentUserApi } from "../utils/api/apiCalls/UserApi";
import { useNavigate } from "react-router-dom";
import useSnackbarHandle from "../utils/hooks/useSnackbarHandle"
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarHandle();

  useEffect(() => {
    const authenticaUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoadingAuth(false);
        return;
      }

      try {
        const response = await GetCurrentUserApi();
        navigate("/");
        setAuth(response.data.userSession);
      } catch (error) {
        if (error && error.code === "ERR_NETWORK") {
          showSnackbar("Servidor desconectado", "error", true);
        }
        setAuth({});
      } finally {
        setLoadingAuth(false);
      }
    };

    authenticaUser();
  }, []);

  const closeSession = () => {
    setAuth({});
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, loadingAuth, setAuth, closeSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
