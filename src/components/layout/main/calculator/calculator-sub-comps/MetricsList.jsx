import ChevronIcon from "../../../../../icons/ChevronIcon.jsx";
import styles from "./MetricsList.module.css";
import {useState} from "react";
import {useCalculatorStore} from "../../../../../store/use-calculator-store.js";

const normalizeValue = (id, value) => {
   if (!value || !isFinite(value)) {
      return "n/a";
   }

   const localVal = value.toLocaleString('ru-RU', {
      minimumFractionDigits: 2, maximumFractionDigits: 2
   });

   if (id === "APC") {
      return localVal;
   }

   if (id === "OP") {
      return `${localVal} %`
   }

   return `${localVal} \u20BD`;
}

function MetricsList() {
   const [isOpen, setIsOpen] = useState(false);
   const {currentResult} = useCalculatorStore();

   return (
      <div className={styles.calcMetrics}>
         <div className={styles.metricsHeader}>
            <button
               className={styles.metricsButton}
               onClick={() => setIsOpen(prev => !prev)}
            >
               <ChevronIcon
                  rotated={isOpen}
                  width={16}
                  height={8}
               />
            </button>
            <h4>Остальные метрики</h4>
         </div>
         {isOpen && (
            <ul className={styles.metricsList}>
               {Object.entries(currentResult).map(elem => (
                  <li className={styles.metricItem} key={elem[0]}>
                     <span className={styles.metricTitle}>{elem[1].title}</span>
                     <span className={styles.metricValue}>
                  {normalizeValue(elem[0], elem[1].value)}
               </span>
                  </li>
               ))}
               {/*{unitResultData.map(elem => (*/}
               {/*   <li className={styles.metricItem} key={elem.id}>*/}
               {/*      <span className={styles.metricTitle}>{elem.title}</span>*/}
               {/*      <span className={styles.metricValue}>*/}
               {/*   {normalizeValue(elem.id, currentResult[elem.id])}*/}
               {/*</span>*/}
               {/*   </li>*/}
               {/*))}*/}
            </ul>
         )}
      </div>
   );
}

export default MetricsList;