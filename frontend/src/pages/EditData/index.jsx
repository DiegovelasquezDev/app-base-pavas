import React, { useState } from "react";
import { WrapperComponent } from "../../components";

function EditableField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}

export default function EditData({ Data, onSave }) {
  const [editedData, setEditedData] = useState(Data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedData);
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
            {Object.keys(Data).map((key) => (
              <div className="mb-4" key={key}>
                <label className="block text-gray-600 font-semibold">
                  {key}
                </label>
                <p>{Data[key]}</p>
              </div>
            ))}
          </div>

          {/* Lado derecho: Formulario de edición */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-2xl font-semibold mb-4">Editar Información</h2>
            <form>
              {Object.keys(Data).map((key) => (
                <EditableField
                  key={key}
                  label={key}
                  name={key}
                  value={editedData[key]}
                  onChange={handleInputChange}
                />
              ))}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleSave}
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </WrapperComponent>
  );
}
