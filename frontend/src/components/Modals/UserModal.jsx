import React, { useEffect, useState } from "react";
import ModalComponent from "../utilsComponents/ModalComponent";
import useForm from "../../utils/hooks/useForm";
import { createUserApi, updateUserApi } from "../../utils/api/apiCalls/UserApi";
import { LoadingComponent } from "..";
import { validateInteger, validateEmail, validatePassword } from "../../utils/functions"
import useSnackbarHandler from "../../utils/hooks/useSnackbarHandle";
import { userModel } from "../../models/userModel"


function formatDateToMySQLFormat(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const UserModal = ({ editMode, selectedUser, localData, setLocalData, ...props }) => {
  const {
    dni,
    firstName,
    lastName,
    email,
    password,
    onResetForm,
    onInputChange,
  } = useForm(userModel);
  const { showSnackbar } = useSnackbarHandler();
  const [loading, setLoading] = useState(false);

  useEffect(() => onResetForm(), [props.showModal])

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validatePassword(password)) {
      showSnackbar("Por favor ingresa una contraseña valida, debe contener una mayuscula, una miniscula, numeros, un caracter especial y al menos 8 caracteres", "warning", false);
      return
    }

    try {
      setLoading(true);

      if (editMode) {
        const id = selectedUser.id;
        // await updateUserApi({ id, password });
        const updateDate = localData.map(data => (data.id === id ? { ...data, updated_at: formatDateToMySQLFormat(new Date()) } : data))
        console.log(updateDate)
        setLocalData(updateDate);
        showSnackbar("Se actualizó con éxito el usuario", "success", false);
      } else {
        if (!validateInteger(dni)) {
          showSnackbar("Por favor ingresa un documento valido", "warning", false);
          return
        }

        if (!validateEmail(email)) {
          showSnackbar("Por favor ingresa un email valido", "warning", false);
          return
        }
        // await createUserApi({
        //   dni,
        //   firstName,
        //   lastName,
        //   email,
        //   password,
        // });

        showSnackbar("Se registró con éxito el usuario", "success", false);
      }
    } catch (error) {
      console.log(error)
      const errorMessage = editMode
        ? "No se pudo actualizar el usuario"
        : "No se pudo registrar el usuario";
      showSnackbar(errorMessage, "error", false);
    } finally {
      setLoading(false);
      props.setShowModal(false)
    }
  };

  return (
    <ModalComponent {...props}>
      <form className="w-full max-w-lg" onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="id"
            >
              Cedula
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="id"
              type="number"
              placeholder="12345678"
              name="dni"
              value={editMode ? selectedUser.dni : dni}
              onChange={onInputChange}
              disabled={editMode}
              required={editMode ? false : true}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Nombres
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              name="firstName"
              value={editMode ? selectedUser.firstName : firstName}
              onChange={onInputChange}
              disabled={editMode}
              required={editMode ? false : true}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Apellidos
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
              name="lastName"
              value={editMode ? selectedUser.lastName : lastName}
              onChange={onInputChange}
              disabled={editMode}
              required={editMode ? false : true}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Correo electronico
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="email"
              placeholder="jane.doe@example.com"
              name="email"
              value={editMode ? selectedUser.email : email}
              onChange={onInputChange}
              disabled={editMode}
              required={editMode ? false : true}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Asignar contraseña
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="******************"
              name="password"
              value={password}
              onChange={onInputChange}
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {props.editMode ? "Guardar cambios" : "Registrar"}
          </button>
        </div>
      </form>
      {loading && <LoadingComponent loading={loading} />}
    </ModalComponent>
  );
};

export default UserModal;