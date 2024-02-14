import React, { useState } from "react";
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
import { useSnackbar } from "notistack";
import RegisterUserModal from "../../components/Modals/RegisterUserModal";

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

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (user) => {
    if (
      window.confirm(
        `¿Estas seguro de que deseas eliminar este usuario con cedula ${user.dni}?`
      )
    ) {
      try {
        await deleteUserApi(user.id);
        loadData();
        enqueueSnackbar("Usuario eliminado con exito", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar("No se pudo eliminar el usuario", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    }
  };

  return (
    <WrapperComponent category={"Pages"} title={"Usuarios"}>
      <>
        <RegisterUserModal
          title={"Registrar"}
          showModal={showModal}
          setShowModal={setShowModal}
          loadData={loadData}
        />
        <SearchComponent
          label="Buscar documento ..."
          search={search}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setModal={setShowModal}
        />

        {loading ? (
          <LoadingComponent loading={loading} />
        ) : (
          <>
            <TableComponent
              columns={columns}
              data={pagination.data}
              onDelete={handleDelete}
            />
            <PaginationComponent
              totalRecords={pagination.totalRecords}
              totalPages={pagination.totalPages}
              numberPage={request.numberPage}
              itemsPerPage={pagination.itemsPerPage}
              onChange={goToPage}
              onPageSizeChange={changePageSize}
            />
          </>
        )}
      </>
    </WrapperComponent>
  );
}
