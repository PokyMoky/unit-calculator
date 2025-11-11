import styles from './CalculatorHeader.module.css'
import OptionsIcon from "../../../../../icons/OptionsIcon.jsx";
import {useCalculatorStore} from "../../../../../store/use-calculator-store.js";

function CalculatorHeader({children}) {
   const {headerValue, setHeaderValue, isHeaderEditing, setIsHeaderEditing, toggleShowOptions} = useCalculatorStore();

   const handleHeaderSave = (e) => {
      setIsHeaderEditing(false);
      setHeaderValue(e.target.value);
      localStorage.setItem("header", JSON.stringify(headerValue));
   }

   return (
      <div className={styles.calculatorHeader}>
         <div className={styles.headerContainer}>
            <div className={styles.headerMobile}>
               {isHeaderEditing ? (
                  <input className={styles.editHeaderInput}
                         autoFocus={true}
                         value={headerValue}
                         onChange={(e) => setHeaderValue(e.target.value)}
                         onBlur={handleHeaderSave}
                         onKeyDown={(e) => {
                            if (e.key === "Enter") {
                               handleHeaderSave(e);
                            }
                         }}
                  />) : (
                  <h4>{headerValue}</h4>
               )}
               <button
                  className={styles.options}
                  onClick={toggleShowOptions}>
                  <OptionsIcon/>
               </button>
            </div>
            <div className={styles.headerDesktop}>
               <input className={styles.headerInput}
                      type="text"
                      value={headerValue}
                      onChange={(e) => setHeaderValue(e.target.value)}
                      onBlur={handleHeaderSave}
                      onKeyDown={(e) => {
                         if (e.key === "Enter") {
                            handleHeaderSave(e);
                            e.target.blur();
                         }
                      }}
               />
               {children}
            </div>
         </div>
      </div>

   );
}

export default CalculatorHeader;