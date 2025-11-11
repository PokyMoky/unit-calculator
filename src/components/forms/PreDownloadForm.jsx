import {privacyPolicy} from "../../utils/constants.js";
import {useCalculatorStore} from "../../store/use-calculator-store.js";
import styles from "./PreDownloadForm.module.css";

function PreDownloadForm({onClose, handleDownload}) {

   const {isPending, isError, errorMessage} = useCalculatorStore();

   return (
      <div className={styles.downloadFormContainer}>
         <div className={styles.downloadFormWrapper}>
            <button type="button" className="closeButton" onClick={onClose}>
               &times;
            </button>
            <form className={styles.downloadForm} onSubmit={handleDownload}>
               <h4>Скачивание расчета</h4>
               <p>Напишите свой email.<br/>Мы отправим вам xsl-файл с&nbsp;расчётами</p>
               <div className={styles.labelAndError}>
                  <label htmlFor="email">Email<span>*</span></label>
                  {isError && <p><span>{errorMessage}</span></p>}
               </div>
               <input type="email" name="email" id="email" required/>
               <button className="redButton" type="submit" disabled={isPending}>
                  Отправить
               </button>
               <p className={styles.agreement}>
                  Нажимая кнопку, я даю согласие
                  <a
                     href={privacyPolicy}
                     target={"_blank"}
                     rel={"noopener noreferrer"}>&nbsp;на&nbsp;обработку персональных данных
                  </a>
               </p>
            </form>
         </div>
      </div>
   );
}

export default PreDownloadForm;