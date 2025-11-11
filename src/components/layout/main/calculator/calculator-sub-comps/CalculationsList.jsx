import EditIcon from "../../../../../icons/EditIcon.jsx";
import {useMediaQuery} from "react-responsive";
import {useCalculatorStore} from "../../../../../store/use-calculator-store.js";
import styles from "./CalculationsList.module.css"

function CalculationsList() {
   const {calculationsList, handleEditCalcListItem} = useCalculatorStore();
   const isWide = useMediaQuery({minWidth: 1024})

   function formula(strings, ...values) {
      const elements = [];
      strings.forEach((str, i) => {
         elements.push(str);
         if (i < values.length) {
            const value = values[i];
            const formatted = Number(value).toLocaleString('ru-RU', {
               minimumFractionDigits: 2,
               maximumFractionDigits: 2
            });
            elements.push(<span key={`${value}-${i}`} className="number">{formatted}</span>);
         }
      });
      return <>{elements}</>;
   }

   return (
      <div className={styles.calculationsListWrapper}>
         <ul className={styles.calculationsList}>
            {calculationsList.map((item) => (
               <li key={item.id}>
                  <div className={styles.listHeader}>
                     <h4>{item.header}</h4>
                     <button className={styles.listButton} onClick={() => handleEditCalcListItem(item.id)}>
                        <EditIcon/>
                        {isWide && <span>Редактировать</span>}
                     </button>
                  </div>
                  <p className={styles.listBody}>
                     {formula`− ( ${item?.input?.CPC} / ${item?.input?.CR1} / ${item?.input?.CR2} ) + 
                  ( ${item?.input?.AVP} − ${item?.input?.COGS} )  \u00D7 ${item?.input?.Ret}`}
                     {" "}= {item?.result?.PPPU.value.toLocaleString('ru-RU', {
                     minimumFractionDigits: 2,
                     maximumFractionDigits: 2
                  })} ₽
                  </p>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default CalculationsList;