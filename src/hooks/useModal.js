import {useEffect, useRef, useState} from "react";
import {useCalculatorStore} from "../store/use-calculator-store.js";

export default function useModal() {
   const {setIsError, setErrorMessage} = useCalculatorStore();
   const [isOpen, setIsOpen] = useState(false);
   const modalRef = useRef(null);

   const open = () => setIsOpen(true);

   const close = () => {
      setIsError(false);
      setErrorMessage("");
      setIsOpen(false)
   };

   useEffect(() => {
      if (isOpen && modalRef.current?.showModal) {
         modalRef.current.showModal();
      } else if (!isOpen && modalRef.current?.close) {
         modalRef.current.close();
      }
   }, [isOpen]);

   return {isOpen, modalRef, open, close};
}