import FormEl from "../calculator-small-comps/FormEl.jsx";
import styles from "./CalculationMobile.module.css";
import Modal from "../../../../util-components/Modal.jsx";
import {useState} from "react";
import MobileCalculationForm from "../../../../forms/mobile-input/MobileCalculationForm.jsx";
import ResultField from "../calculator-small-comps/ResultField.jsx";
import useModal from "../../../../../hooks/useModal.js";
import {useCalculatorStore} from "../../../../../store/use-calculator-store.js";


function CalculationMobile({handleUnifiedSubmit}) {
   const {currentInputData, currentResult} = useCalculatorStore();

   const {isOpen, open, close, modalRef} = useModal();
   const [activeField, setActiveField] = useState(null);
   const [activeValue, setActiveValue] = useState(null);

   const startEditing = (abbr) => {
      setActiveField(abbr);
      setActiveValue(currentInputData[abbr].toString());
      open();
   }

   const handleSubmitMobile = (e) => {
      handleUnifiedSubmit(e, activeValue, activeField);
      close();
   }

   function renderFormula(strings, ...values) {
      return strings.flatMap((str, i) =>
         i < values.length
            ? [str, <FormEl key={values[i]} abbr={values[i]} value={currentInputData[values[i]]} onEdit={startEditing}/>]
            : [str]
      );
   }

   const CPC = "CPC";
   const CR1 = "CR1";
   const CR2 = "CR2";
   const AVP = "AVP";
   const COGS = "COGS";
   const Ret = "Ret";

   return (
      <>
         {isOpen && (
            <Modal ref={modalRef} classname={"modal"}>
               <MobileCalculationForm
                  activeField={activeField}
                  handleSubmit={handleSubmitMobile}
                  setActiveValue={setActiveValue}
                  activeValue={activeValue}
                  onClose={close}
                  closeBtnColor={"white"}
               />
            </Modal>
         )}
         <div className={styles.calculation}>
            <div className={styles.formula}>
               <div className={`${styles.formulaWhite} ${styles.au}`}>
                  <FormEl abbr={"AU"} value={currentInputData?.AU} onEdit={startEditing}/>
               </div>
               <div className={styles.formulaPink}>
                  <div className={styles.operandsField}>
                     {renderFormula`−(${CPC}/${CR1}/${CR2})+`}
                  </div>
                  <ResultField abbr={"CPPU"} currentResult={currentResult}/>
               </div>
               <div className={styles.formulaBlue}>
                  <div className={styles.operandsField}>
                     {renderFormula`+(${AVP}-${COGS})\u00D7`}
                  </div>
                  <ResultField abbr={"Margin"} currentResult={currentResult}/>
               </div>
               <div className={styles.formulaGrey}>
                  <div className={styles.operandsField}>
                     {renderFormula`\u00D7 ${Ret}`}
                  </div>
                  <ResultField abbr={"LTV"} currentResult={currentResult}/>
               </div>
               <div className={styles.formulaWhite}>
                  <div className={styles.operandsField}>
                     <span>=</span>
                     <ResultField
                        abbr={"PPPU"}
                        currentResult={currentResult}
                        className={currentResult?.PPPU.value < 0 ? styles.red : styles.green}
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default CalculationMobile;