import React, { useEffect, useState } from "react";
import {
  SearchComponent,
  PaginationComponent,
  TableComponent,
  WrapperComponent,
  LoadingComponent,
} from "../../components";
import {
  GetUsersPagination,
  deleteUserApi,
} from "../../utils/api/apiCalls/UserApi";
import usePagination from "../../utils/hooks/usePagination";
import UserModal from "../../components/Modals/UserModal";
import useSnackbarHandler from "../../utils/hooks/useSnackbarHandle";

const columns = [
  { key: "dni", label: "Documento" },
  { key: "firstName", label: "Nombres" },
  { key: "lastName", label: "Apellidos" },
  { key: "email", label: "Correo electronico" },
  { key: "created_at", label: "Fecha de creacion" },
  { key: "updated_at", label: "Fecha de actualizacion" },
];

export default function Users() {
  const {
    request,
    pagination,
    goToPage,
    changePageSize,
    search,
    loading,
    loadData,
  } = usePagination(GetUsersPagination);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { showSnackbar } = useSnackbarHandler();
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [localData, setLocalData] = useState([]);

  useEffect(() => setLocalData(pagination.data), [pagination])

  const handleEdit = (user) => {
    setEditMode(true);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleRegister = () => {
    setEditMode(false);
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleDelete = async (user) => {
    if (
      window.confirm(
        `¿Estas seguro de que deseas eliminar este usuario con cedula ${user.dni}?`
      )
    ) {
      try {
        // await deleteUserApi(user.id);
        setLocalData(localData.filter(item => item.id !== user.id))
        showSnackbar("Usuario eliminado con exito", "success", false)
      } catch (error) {
        showSnackbar("No se pudo eliminar el usuario", "error", false)
      }
    }
  };




  return (
    <WrapperComponent category={"Pages"} title={"Usuarios"}>
      <>
        <UserModal
          title={editMode ? "Editar Usuario" : "Registrar usuario"}
          showModal={showModal}
          setShowModal={setShowModal}
          localData={localData}
          setLocalData={setLocalData}
          editMode={editMode}
          selectedUser={selectedUser}
        />
        <SearchComponent
          label="Buscar ..."
          search={search}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setModal={handleRegister}
        />
        {loading ? (
          <LoadingComponent loading={loading} />
        ) : (
          <>
            <TableComponent
              columns={columns}
              data={localData}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <PaginationComponent
              totalRecords={pagination.totalRecords}
              totalPages={pagination.totalPages}
              numberPage={request.numberPage}
              itemsPerPage={pagination.itemsPerPage}
              onChange={goToPage}
              onPageSizeChange={changePageSize}
              loadData={loadData}
            />
          </>
        )}
      </>
    </WrapperComponent>
  );
}
