import { useState } from "react";
import { useSnackbar } from "notistack";
import { loginUserApi } from "../api/apiCalls/UserApi";
import { validateEmail } from "../functions/ValidateRegex";

const useLogin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const loginApp = async ({ email, password }) => {
    if (!validateEmail(email)) {
      enqueueSnackbar("Correo no valido, por favor ingresa otro", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }

    try {
      setLoading(true);
      const response = await loginUserApi({ email, password });
      // hacer algo aca para guardar sesion de usuario
      return response;
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(
          "No se pudo iniciar sesion, verifica tus credenciales",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      } else {
        enqueueSnackbar("Servidor no disponible en estos momentos", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loginApp, loading };
};

export default useLogin;
