import {createPortal} from "react-dom";

function Modal({children, ref}) {
   return createPortal(
      <dialog ref={ref} className="modal">
         <div className={"modalContent"}>
            {children}
         </div>
      </dialog>,
      document.getElementById("modal")
   );
}

export default Modal;