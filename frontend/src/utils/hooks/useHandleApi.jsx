import { useState } from "react";
import { useSnackbar } from "notistack";

const useHandleApi = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleApiCall = async (apiFunction, params) => {
    try {
      setLoading(true);
      const response = await apiFunction(params);
      return response;
    } catch (error) {
      if (error.response) {
        console.log(error);
        enqueueSnackbar(error.response.data.error, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        return;
      } else {
        enqueueSnackbar("Servidor no disponible en estos momentos", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleApiCall, loading };
};

export default useHandleApi;
