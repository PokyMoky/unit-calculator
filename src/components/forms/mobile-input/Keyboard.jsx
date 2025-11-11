import SpaceIcon from "../../../icons/SpaceIcon.jsx";
import BackspaceIcon from "../../../icons/BackspaceIcon.jsx";
import CheckIcon from "../../../icons/CheckIcon.jsx";
import {keyboardButtons} from "../../../utils/constants.js";

function Keyboard({handleKeyPress, handleDelete}) {
   const btns = keyboardButtons.map(button => (
      <button
         type="button"
         key={button.id}
         onClick={button.id === "backspace" ?
            handleDelete : () => handleKeyPress(button.value)}
      >
         {button.id === "space" ?
            <SpaceIcon/> : button.id === "backspace" ?
               <BackspaceIcon/> : button.value}
      </button>
   ))

   return (
      <div className="keyboard">
         {btns}
         <button
            type="submit"
            className="done">
            <CheckIcon/>
         </button>
      </div>
   )
}

export default Keyboard;