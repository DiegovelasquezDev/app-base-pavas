import React, { useEffect, useState } from "react";
import ModalComponent from "../utilsComponents/ModalComponent";
import useForm from "../../utils/hooks/useForm";
import { createUserApi, updateUserApi } from "../../utils/api/apiCalls/UserApi";
import { LoadingComponent } from "..";
import { validateInteger, validateEmail, validatePassword } from "../../utils/functions"
import useSnackbarHandler from "../../utils/hooks/useSnackbarHandle";
import { userModel } from "../../models/userModel"

const UserModal = (props) => {
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
      showSnackbar("Por favor ingresa una contraseña valida, debe contener una mayuscula, una miniscula, numeros, un caracter especial y al menos 8 caracteres", "warning", true);
      return
    }

    try {
      setLoading(true);

      if (props.editMode) {
        const id = props.selectedUser.id;
        await updateUserApi({ id, password });
        props.loadData();
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
        await createUserApi({
          dni,
          firstName,
          lastName,
          email,
          password,
        });
        props.loadData();
        showSnackbar("Se registró con éxito el usuario", "success", false);
      }
    } catch (error) {
      const errorMessage = props.editMode
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
              value={props.editMode ? props.selectedUser.dni : dni}
              onChange={onInputChange}
              disabled={props.editMode}
              required={props.editMode ? false : true}
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
              value={props.editMode ? props.selectedUser.firstName : firstName}
              onChange={onInputChange}
              disabled={props.editMode}
              required={props.editMode ? false : true}
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
              value={props.editMode ? props.selectedUser.lastName : lastName}
              onChange={onInputChange}
              disabled={props.editMode}
              required={props.editMode ? false : true}
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
              value={props.editMode ? props.selectedUser.email : email}
              onChange={onInputChange}
              disabled={props.editMode}
              required={props.editMode ? false : true}
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