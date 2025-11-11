import styles from "./CalcDropDownMenu.module.css"
import EditIcon from "../../../../../icons/EditIcon.jsx";
import DownloadIcon from "../../../../../icons/DownloadIcon.jsx";
import CloneIcon from "../../../../../icons/CloneIcon.jsx";
import BucketIcon from "../../../../../icons/BucketIcon.jsx";
import {useCalculatorStore} from "../../../../../store/use-calculator-store.js";

function CalcDropDownMenu({handleHeaderEdit, handleDownload}) {
   const {handleClone, handleDelete} = useCalculatorStore();

   return (
      <ul className={styles.optionsMenu}>
         <li>
            <button
               className={`${styles.option} ${styles.rename}`} onClick={handleHeaderEdit}>
               <EditIcon/>
               <span>Переименовать</span>
            </button>
         </li>
         <li>
            <button className={`${styles.option} ${styles.download}`} onClick={handleDownload}>
               <DownloadIcon/>
               <span>Скачать</span>
            </button>
         </li>
         <li>
            <button className={`${styles.option} ${styles.clone}`} onClick={handleClone}>
               <CloneIcon />
               <span>Сдублировать</span>
            </button>
         </li>
         <li>
            <button className={`${styles.option} ${styles.delete}`} onClick={handleDelete}>
               <BucketIcon />
               <span>Удалить</span>
            </button>
         </li>
      </ul>
   );
}

export default CalcDropDownMenu;