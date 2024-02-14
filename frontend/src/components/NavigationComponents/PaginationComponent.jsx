import React, { useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function PaginationComponent({
  totalRecords,
  totalPages,
  numberPage,
  itemsPerPage,
  onChange,
  onPageSizeChange,
}) {
  return (
    <div className="flex flex-row mt-2 items-center justify-end">
      <span className="text-sm text-gray-700 dark:text-gray-400 mr-3">
        Pagina
        <span className="font-semibold text-gray-900 dark:text-white">
          {" "}
          {numberPage ? numberPage : 1}
        </span>
        <span className="font-semibold text-gray-900 dark:text-white">
          {itemsPerPage}{" "}
        </span>
        de{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPages}
        </span>
        <span className="font-semibold text-gray-900 dark:text-gray-400">
          {" "}
          - total registros{" "}
        </span>
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalRecords}
        </span>
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => onChange(numberPage - 1)}
          disabled={numberPage === 1}
          className="flex ml-1 items-center justify-center px-4 h-10 text-base font-medium text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded hover-bg-gray-900 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white"
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          onClick={() => onChange(numberPage + 1)}
          disabled={numberPage === totalPages}
          className="flex ml-1 items-center justify-center px-4 h-10 text-base font-medium text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded hover-bg-gray-900 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white"
        >
          <AiOutlineArrowRight />
        </button>
        <select
          className="ml-2 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border-0 rounded cursor-pointer"
          value={itemsPerPage}
          onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
        >
          <option value="">--</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
}
