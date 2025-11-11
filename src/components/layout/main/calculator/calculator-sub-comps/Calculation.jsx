import {calculateResults} from "../../../../../utils/calculation.js";
import CalculationMobile from "./CalculationMobile.jsx";
import CalculationDesktop from "./CalculationDesktop.jsx";
import {useCalculatorStore} from "../../../../../store/use-calculator-store.js";
import {normalizeNumber} from "../../../../../utils/utils.js";

function Calculation({isNarrow}) {

   const {setCurrentResult, currentInputData, setCurrentInputData} = useCalculatorStore();

   function updateResults(updatedData) {
      const updatedResults = calculateResults(updatedData);
      setCurrentResult(updatedResults);
      localStorage.setItem("results", JSON.stringify(updatedResults));
   }

   const handleUnifiedSubmit = (e, activeValue, activeField) => {
      e.preventDefault();
      const normalizedValue = normalizeNumber(String(activeValue).replace(",", "."));
      const numValue = parseFloat(normalizedValue);
      const updatedData = {
         ...currentInputData,
         [activeField]: numValue,
      }

      setCurrentInputData(updatedData);
      localStorage.setItem("curItem", JSON.stringify(updatedData));

      updateResults(updatedData);
   }

   return (
      <>
         {isNarrow ? <CalculationMobile
            handleUnifiedSubmit={handleUnifiedSubmit}
         /> : <CalculationDesktop
            handleUnifiedSubmit={handleUnifiedSubmit}
         />}
      </>
   );
}

export default Calculation;