import React from "react";
import dataImg from "../../utils/img/data.png";

const NoDataAvailableComponent = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center ml-4 sm:ml-8 bg-gray-50 dark:bg-gray-900 p-8 rounded-xl sm:mr-[-178px]">
        <p className="text-gray-700 dark:text-gray-400 text-xl font-extrabold mb-4">
          Lo siento, no hay datos disponibles
        </p>
      </div>
      <img
        src={dataImg}
        alt="No disponible"
        className="w-80 h-96 hidden object-contain sm:block"
      />
    </div>
  );
};

export default NoDataAvailableComponent;
