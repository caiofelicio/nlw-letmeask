import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function showToastNotify(msg: string, mode: string) {
    if (mode === "erro") {
        toast.error(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });

        return;
    }

    if (mode === "info") {
        toast.info("Copiado!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });

        return;
    }

    return;
}

export { showToastNotify };
