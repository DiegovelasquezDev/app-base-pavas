import React from "react";
import { IoMdClose } from "react-icons/io";

const ModalComponent = ({ title, showModal, setShowModal, children }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center bg-transparent items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white dark:bg-gray-800 rounded-lg ">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none border-blueGray-200 dark:border-gray-600">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200 dark:border-gray-600">
                  <h3 className="text-3xl font-semibold text-black dark:text-white">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold text-black dark:text-white"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black dark:text-white">
                      <IoMdClose />
                    </span>
                  </button>
                </div>
                {/* body */}
                <div className="relative p-6 flex-auto text-black dark:text-white">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black dark:bg-gray-900"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalComponent;
