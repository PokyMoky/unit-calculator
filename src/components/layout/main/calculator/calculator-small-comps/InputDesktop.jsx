import styles from "../calculator-sub-comps/CalculationDesktop.module.css";
import {useEffect, useState} from "react";
import {getValidationMessage, validateValue} from "../../../../../utils/valdation.js";
import {formatNumberInput} from "../../../../../utils/utils.js";

function InputDesktop({incomeValue, name, handleUnifiedSubmit}) {
   const [currentValue, setCurrentValue] = useState(incomeValue);

   useEffect(() => {
      if (incomeValue !== null && incomeValue !== undefined) {
         const formatted = formatWithSpaces(incomeValue.toString().replace(".", ","));
         setCurrentValue(formatted);
      }
   }, [incomeValue]);

   function formatWithSpaces(value) {
      const [integerPart, decimalPart] = value.split(",");

      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
   }


   function handleChange(e) {
      e.target.setCustomValidity("");
      let newValue = e.target.value;

      const regex = /^[0-9.,\s]*$/;
      if (!regex.test(newValue)) return;

      const formatted = formatNumberInput(newValue);
      setCurrentValue(formatted);
   }

   function handleBlur(e) {
      const input = e.currentTarget;

      if (!validateValue(name, e.currentTarget.value)) {
         input.setCustomValidity(getValidationMessage(name));
         input.reportValidity();
      } else {
         input.setCustomValidity("");

         const formatted = e.currentTarget.value.replace(".", ",");

         handleUnifiedSubmit(e, e.currentTarget.value, name);
         setCurrentValue(formatted);
      }
   }

   return (
      <input
         type="text"
         name={name}
         id={name}
         className={styles.formulaInput}
         value={currentValue}
         onChange={handleChange}
         onBlur={handleBlur}
      />
   );
}

export default InputDesktop;