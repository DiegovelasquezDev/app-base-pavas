import React from "react";

const EventForm = () => {
  return (
    <div className="max-w mx-auto p-6 text-center mb-5">
      <h1 className="text-2xl font-bold mb-4">Agregar Evento</h1>

      <form className="flex flex-col md:flex-row items-stretch">
        {/* Input de Título */}
        <div className="mb-4 md:mr-2 md:flex-1">
          <label
            htmlFor="title"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full md:w-auto px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Input de Fecha Inicial */}
        <div className="mb-4 md:mr-2 md:flex-1">
          <label
            htmlFor="startDate"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Fecha Inicial
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Input de Fecha Final */}
        <div className="mb-4 md:mr-2 md:flex-1">
          <label
            htmlFor="endDate"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Fecha Final
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Botón de Enviar */}
        <div className="md:self-center mt-[10px]">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full md:w-auto"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
