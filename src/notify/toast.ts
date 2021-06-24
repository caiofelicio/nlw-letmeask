import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function showToastNotify(msg: string, mode: string) {
    if (mode === "erro") {
        toast.error(msg, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
        });

        return;
    }

    if (mode === "info") {
        toast.info(msg, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
        });

        return;
    }

    if (mode === "sucess") {
        toast.success(msg, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
            style: {
                background: "#835af2",
            },
        });

        return;
    }

    return;
}

export { showToastNotify };
