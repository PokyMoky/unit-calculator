import styles from "./ComparisonTable.module.css"
import {useMediaQuery} from "react-responsive";
import MobileTable from "../calculator-small-comps/MobileTable.jsx";
import DesktopTable from "../calculator-small-comps/DesktopTable.jsx";
import {useCalculatorStore} from "../../../../../store/use-calculator-store.js";
import {useEffect} from "react";

function ComparisonTable({children}) {
   const {getTableData, setComparisonTable, calculationsList} = useCalculatorStore();
   const isNarrow = useMediaQuery({maxWidth: 1100});

   const tableData = getTableData();

   useEffect(() => {
      setComparisonTable(tableData);
   }, [calculationsList]);

   return (
      <>
         <div className={styles.comparisonTable}>
            <h4>Сравнение результатов</h4>
            <div className={styles.tableWrapper}>
               {isNarrow
                  ? <MobileTable tableData={tableData}/>
                  : <DesktopTable tableData={tableData}/>
               }
            </div>
            <div className={styles.listsControlBtns}>
               {children}
            </div>
         </div>
      </>
   );
}

export default ComparisonTable;