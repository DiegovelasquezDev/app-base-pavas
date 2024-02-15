import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";

// Context y Hooks
import { useStateContext } from "../../contexts/ContextProvider";
import useAuth from "../../utils/hooks/useAuth";
import useForm from "../../utils/hooks/useForm";
import useSnackbarHandle from "../../utils/hooks/useSnackbarHandle";

// API Calls
import { loginUserApi } from "../../utils/api/apiCalls/UserApi";

// Validaciones y Modelos
import { validateEmail } from "../../utils/functions/ValidateRegex";
import { loginModel } from "../../models";

// Componentes
import { LoadingComponent } from "../../components";

const Login = () => {
  const { setAuth } = useAuth();
  const { currentMode } = useStateContext();
  const { email, password, onInputChange } = useForm(loginModel);
  const { showSnackbar } = useSnackbarHandle();
  const [loading, setLoading] = useState(false);

  const onLogin = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      showSnackbar(`El correo electrónico ingresado no es válido`, "warning", false);
      return;
    }

    try {
      setLoading(true);
      const data = await loginUserApi({ email, password });
      handleLoginSuccess(data);
    } catch (error) {
      handleLoginError(error);

    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem("token", data.user.token);
    setAuth(data.user);
    location.reload();
  };

  const handleLoginError = (error) => {
    if (error.response) {

      const errorMessage = error.response.data.errorMessage;
      showSnackbar(`${errorMessage}`, "error", false);
    } else {
      showSnackbar("Servidor no está funcionando", "error", true);
    }
  };

  return (
    <main className={currentMode === "Dark" ? "dark" : ""}>
      <section className="bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-16 h-screen animate__animated animate__fadeIn">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <FaGithub className="w-8 h-8 mr-2" />
            App login
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Inicia sesión en tu cuenta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onLogin}>
                <div>
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="prueba@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contraseña <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                    placeholder="•••••••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-700 hover:bg-sky-400 ${loading ? "bg-gray-300 hover:bg-gray-300" : null
                    }`}
                  disabled={loading}
                >
                  LOG IN
                </button>
              </form>
            </div>
            {loading && <LoadingComponent loading={loading} />}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
