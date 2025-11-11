import styles from "../calculator-sub-comps/CalculationMobile.module.css";

function ResultField({abbr, currentResult,
                        className=`${styles.intermediate} 
                        ${currentResult?.[abbr].value < 0 ? 
                           styles.red : styles.grey}`}) {
   function formatCurrency(value) {
      if (value == null || !isFinite(value)) return "n/a";
      return `${value.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ₽`;
   }

   return (
      <div className={styles.resultField}>
         <abbr>{abbr}</abbr>
         <p
            className={className}>
            {formatCurrency(currentResult[abbr].value)}
         </p>
      </div>
   );
}

export default ResultField;