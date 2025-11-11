import {useState} from "react";
import axios from "axios";

export default function usePostRequest() {
   const [isPending, setIsPending] = useState(false);

   const sendData = async (payload, endpoint) => {
      setIsPending(true);
      try {
         const response = await axios.post(`/api/${endpoint}`, payload);
         return {success: true, message: response.data.message};
      } catch (error) {
         if (typeof error.response.data === "string" ||
            error.response.data === null) {
            return {success: false, message: "Упс, что-то пошло не так"};
         } else {
            return {success: false, message: error.response.data.message};
         }
      } finally {
         setIsPending(false);
      }
   }

   return {isPending, sendData};
}