import { useSnackbar } from "notistack";

const useSnackbarHandler = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (message, status, priority) => {
        console.log("use")
        enqueueSnackbar(message, {
            variant: status,
            persist: priority,
            anchorOrigin: {
                vertical: "top",
                horizontal: "center",
            },
        });
    };

    return { showSnackbar };
};

export default useSnackbarHandler;
