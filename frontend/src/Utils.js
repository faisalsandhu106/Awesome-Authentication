import { toast } from 'react-toastify';

export const hendleSuccess = (msg) => {
    toast.success(msg, {
        position: "top-right",
    })
};

export const hendleError = (msg) => {
    toast.error(msg, {
        position: "top-right",
    })
};  