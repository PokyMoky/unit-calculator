import {useState} from "react";
import isEmail from "validator/lib/isEmail";
import MetricsList from "./calculator-sub-comps/MetricsList.jsx";
import CalculationsList from "./calculator-sub-comps/CalculationsList.jsx";

import styles from "./Calculator.module.css";
import ComparisonTable from "./calculator-sub-comps/ComparisonTable.jsx";
import {useMediaQuery} from "react-responsive";
import CalculatorHeader from "./calculator-sub-comps/CalculatorHeader.jsx";
import CalcDropDownMenu from "./calculator-small-comps/CalcDropDownMenu.jsx";
import DownloadIcon from "../../../../icons/DownloadIcon.jsx";
import CloneIcon from "../../../../icons/CloneIcon.jsx";
import BucketIcon from "../../../../icons/BucketIcon.jsx";
import Calculation from "./calculator-sub-comps/Calculation.jsx";
import Modal from "../../../util-components/Modal.jsx";
import useModal from "../../../../hooks/useModal.js";
import PreDownloadForm from "../../../forms/PreDownloadForm.jsx";
import {API_URL} from "../../../../utils/constants.js";
import {useCalculatorStore} from "../../../../store/use-calculator-store.js";
import ShareButton from "./calculator-small-comps/ShareButton.jsx";

function Calculator() {
   const isNarrow = useMediaQuery({maxWidth: 1023})
   const {isOpen, open, close, modalRef} = useModal();
   const [comparisonOpen, setComparisonOpen] = useState(false);

   const {
      calculationsList, setIsHeaderEditing, setTableName, showOptions, setShowOptions,
      handleClone, handleDelete, handleNewCalculation, handleDownload
   } = useCalculatorStore();


   const handleHeaderEdit = () => {
      setIsHeaderEditing(true);
      setShowOptions(false);
   }

   const showPreDownloadForm = (tableName = "current") => {
      setShowOptions(false);
      setTableName(tableName);
      open();
   }

   const handleDownloadSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      await handleDownload(email, close, isEmail, API_URL);
   }


   return (
      <section className={styles.calculator}>
         {isOpen && (
            <Modal ref={modalRef} classname={"modal"}>
               <PreDownloadForm
                  onClose={close}
                  handleDownload={handleDownloadSubmit}
               />
            </Modal>
         )}
         <CalculatorHeader>
            <div className={styles.headerButtons}>
               <button onClick={showPreDownloadForm}><DownloadIcon/></button>
               <button onClick={handleClone}><CloneIcon/></button>
               <button onClick={handleDelete}><BucketIcon/></button>
            </div>
         </CalculatorHeader>
         {showOptions && (
            <CalcDropDownMenu
               handleDownload={showPreDownloadForm}
               handleHeaderEdit={handleHeaderEdit}
            />)}
         <Calculation isNarrow={isNarrow}/>
         <MetricsList/>
         <CalculationsList/>
         <div className={styles.listsControlBtns}>
            <div className={styles.btnsContainer}>
               <button
                  className={styles.hideButton}
                  disabled={calculationsList.length < 2}
                  onClick={() => setComparisonOpen(prev => !prev)}
               >
                  {comparisonOpen ? (isNarrow ?
                        "Скрыть сравнение" : "Скрыть сравнение расчетов")
                     : "Сравнить"}
               </button>
               <button
                  className={styles.newCalcButton}
                  onClick={handleNewCalculation}
               >
                  Новый расчет
               </button>
            </div>
         </div>
         {comparisonOpen && (
            <ComparisonTable>
               <button
                  className={styles.dnldXSLButton}
                  onClick={() => showPreDownloadForm("comparison")}
               >
                  Скачать XSL
               </button>
               <ShareButton/>
            </ComparisonTable>)}
      </section>
   );
}

export default Calculator;