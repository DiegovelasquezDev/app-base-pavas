import React, { useState } from "react";
import { WrapperComponent } from "../../components";
import useAuth from "../../utils/hooks/useAuth";

export default function Profile() {

  const { auth, closeSession } = useAuth();

  const [userData, setUserData] = useState({
    dni: auth[0].dni,
    Rol: "Administrador",
    firstName: auth[0].firstName,
    lastName: auth[0].lastName,
    email: auth[0].email,
    password: "********",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  return (
    <WrapperComponent category={"Pages"} title={"Perfil"}>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row">
          {/* Lado izquierdo: Información de usuario */}
          <div className="w-full md:w-1/2 md:pr-8">
            <h2 className="text-2xl font-semibold mb-4">
              Información del Usuario
            </h2>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">
                Documento
              </label>
              <p>{userData.dni}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">Rol</label>
              <p>{userData.Rol}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">
                Nombre
              </label>
              <p>
                {userData.firstName} {userData.lastName}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">
                Correo Electrónico
              </label>
              <p>{userData.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">
                Contraseña
              </label>
              <p>{userData.password}</p>
            </div>
          </div>

          {/* Lado derecho: Formulario de edición */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-2xl font-semibold mb-4">Editar Información</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </WrapperComponent>
  );
}
