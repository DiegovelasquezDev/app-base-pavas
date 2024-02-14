import React, { useState } from "react";
import { WrapperComponent } from "../../components";
import RegisterUserModal from "../../components/Modals/RegisterUserModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <WrapperComponent category={"Pages"} title={"Home"}>
      <>
        <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Open regular modal
        </button>

        <RegisterUserModal
          title={"Registrar"}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </>
    </WrapperComponent>
  );
}
