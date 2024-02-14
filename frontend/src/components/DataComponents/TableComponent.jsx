import React from "react";
import NoDataAvailableComponent from "../utilsComponents/NoDataAvailableComponent";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TableComponent({
  columns,
  data,
  OpenEditarModal,
  onDelete,
}) {
  if (!data || data.length === 0) {
    return <NoDataAvailableComponent />;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.label}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700`}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  {item[column.key]}
                </td>
              ))}
              <td className="px-6 py-4 flex items-center">
                <a
                  onClick={() => OpenEditarModal}
                  className="mr-2 text-xl font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                >
                  <FaEdit />
                </a>
                <a
                  onClick={() => onDelete(item)}
                  className="font-medium text-xl text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                >
                  <MdDelete />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
