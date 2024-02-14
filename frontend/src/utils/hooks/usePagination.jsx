import { useState, useEffect } from "react";
import useLoading from "./useLoading";

const initialRequest = {
  search: "",
  orderPagination: "",
  orderColumn: "",
  numberPage: 1,
  itemsPerPage: 5,
};

const initialPagination = {
  totalRecords: 0,
  totalPages: 0,
  data: [],
};

const usePagination = (getDataFunction) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [request, setRequest] = useState(initialRequest);
  const [pagination, setPagination] = useState(initialPagination);

  const loadData = async () => {
    startLoading(true);
    try {
      const response = await getDataFunction(request);
      setPagination(response.data);
    } catch (error) {
      console.log(error);
      if (!error.response) {
        console.log(error);
      }
    } finally {
      stopLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [request, getDataFunction]);

  return {
    request,
    loadData,
    pagination,
    loading,
    goToPage: (numberPage) => setRequest({ ...request, numberPage }),
    changePageSize: (itemsPerPage) =>
      setRequest({ ...request, itemsPerPage, numberPage: 1 }),
    search: (searchTerm) =>
      setRequest({ ...request, search: searchTerm, numberPage: 1 }),
  };
};

export default usePagination;
