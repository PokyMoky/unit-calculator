import Keyboard from "./Keyboard.jsx";
import {unitInputData} from "../../../utils/constants.js";
import styles from "./MobileCalculationForm.module.css"
import {useState} from "react";
import {getValidationMessage, validateValue} from "../../../utils/valdation.js";
import {formatNumberInput} from "../../../utils/utils.js";

function MobileCalculationForm({
                                  activeField,
                                  handleSubmit,
                                  setActiveValue,
                                  activeValue,
                                  onClose}) {
   const {title, prompt} = unitInputData.find(item => item.id === activeField);
   const [error, setError] = useState("");

   const formattedValue = formatNumberInput(activeValue);

   const handleKeyPress = (value) => {
      const currentValue = String(activeValue);
      let newValue;

      if (currentValue === "0" && (value === "." || value === ",")) {
         newValue = "0" + value;
      } else if (currentValue === "0" && ![".", ","].includes(value)) {
         newValue = String(value);
      } else {
         newValue = currentValue + String(value);
      }

      const formatted = formatNumberInput(newValue);

      if (validateValue(activeField, formatted)) {
         setActiveValue(formatted);
         setError("");
      } else {
         setError(getValidationMessage(activeField));
      }
   };

   const handleDelete = () => {
      const currentValue = String(activeValue);
      const newValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
      setActiveValue(newValue);
      setError("");
   };


   return (
      <form className={styles.culcForm} method={"dialog"} onSubmit={handleSubmit}>
         <button type="button" className="closeButton white" onClick={onClose}>
            &times;
         </button>
         <div className={styles.wrapper}>
            <div className={styles.inputBlock}>
               <label className={styles.inputLabel}>
                  <h4 className={styles.title}>{`${activeField} (${title})`}</h4>
                  <p className={styles.prompt}>{prompt}</p>
                  {error && <p className={styles.error}>{error}</p>}
               </label>
               <div
                  className={styles.input}
                  onChange={handleKeyPress}
               >
                  {formattedValue}<span className={styles.cursor}>|</span>
               </div>
            </div>
         </div>
         <div className={styles.keyboardWrapper}>
            <Keyboard
               handleKeyPress={handleKeyPress}
               handleDelete={handleDelete}/>
         </div>
      </form>
   );
}

export default MobileCalculationForm;