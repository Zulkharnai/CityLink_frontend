import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export  default  function ToastMsg (type, msg, id) {
    
     toast[type](msg,{autoClose:1500});
}