import styles from './CalculationDesktop.module.css'
import Tooltip from "../../../../util-components/Tooltip.jsx";
import InputDesktop from "../calculator-small-comps/InputDesktop.jsx";
import {formatCurrency} from "../../../../../utils/utils.js";
import {useCalculatorStore} from "../../../../../store/use-calculator-store.js";

function CalculationDesktop({handleUnifiedSubmit}) {
   const {currentInputData, currentResult} = useCalculatorStore();

   function formula(strings, ...values) {
      const elements = [];

      strings.forEach((str, i) => {
         elements.push(str);
         if (i < values.length) {
            const name = String(values[i]);
            const objId = name === "Ret." ? "Ret" : name.split(',')[0];
            elements.push(
               <div key={name} className={styles.formElem}>
                  <Tooltip id={objId}>
                     <label className={styles.label} htmlFor={objId}>{name}</label>
                  </Tooltip>
                  <InputDesktop
                     incomeValue={currentInputData[objId]}
                     name={objId}
                     id={objId}
                     handleUnifiedSubmit={handleUnifiedSubmit} />
               </div>);
         }
      });

      return <>{elements}</>;
   }

   const CPC = "CPC, \u20BD";
   const CR1 = "CR1, %";
   const CR2 = "CR2, %";
   const AVP = "AVP, \u20BD";
   const COGS = "COGS, \u20BD";
   const Ret = "Ret.";

   return (
      <form className={styles.form}>
         <div className={`au ${styles.au}`}>
            <Tooltip id={"AU"} classname={"au"}>
               <label className={styles.label} htmlFor="AU">AU</label>
            </Tooltip>
            <InputDesktop name={"AU"}
                          className={styles.formulaInput}
                          incomeValue={currentInputData.AU}
                          handleUnifiedSubmit={handleUnifiedSubmit}
            />
            <p>Количество привлеченных пользователей</p>
         </div>
         <div className={styles.inputsPppu}>
            <div className={styles.inputPart}>
               <div className={styles.pink}>
                  <div className={styles.formula}>
                     {formula`−(${CPC}/${CR1}/${CR2})`}
                  </div>
                  <div className={styles.transcript}>
                     <div className={styles.legend}>
                        <p><span>CPPU</span></p>
                        <p>Стоимость привлечения платящего пользователя</p>
                     </div>
                     <p className={currentResult.CPPU.value < 0 ? styles.negative : styles.positive}>
                        {formatCurrency(currentResult.CPPU.value)}
                     </p>
                  </div>
               </div>
               <span>+</span>
               <div className={styles.grey}>
                  <div className={styles.formula}>
                     <div className={styles.blue}>
                        <div className={styles.formula}>
                           {formula`(${AVP}-${COGS})`}
                        </div>
                        <div className={styles.transcript}>
                           <p><span>Margin</span> (Прибыль)</p>
                           <p className={styles.neutral}>{formatCurrency(currentResult.Margin.value)}</p>
                        </div>
                     </div>
                     {formula`\u00D7 ${Ret}`}
                  </div>
                  <div className={styles.transcript}>
                     <p><span>LTV</span> (Доход с одного клиента за все время)</p>
                     <p className={styles.neutral}>{formatCurrency(currentResult.LTV.value)}</p>
                  </div>
               </div>
            </div>
            <div className={`${styles.formElem} ${styles.pppu}`}>
               <Tooltip id={"PPPU"}>
                  <label className={styles.label}>PPPU, ₽</label>
               </Tooltip>
               <p className={styles.result}><span>=</span> {formatCurrency(currentResult.PPPU.value)}</p>
            </div>
         </div>
      </form>
   );
}

export default CalculationDesktop;