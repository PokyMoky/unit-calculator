import {useState} from "react";
import clip from "/src/assets/images/clip.svg"
import telegram from "/src/assets/images/telegram.svg"
import styles from "./ContactForm.module.css";

import {validateContact, validateFile} from "../../utils/valdation.js";
import {privacyPolicy} from "../../utils/constants.js";
import usePostRequest from "../../hooks/usePostRequest.js";

function ContactForm({message, isMobile, buttonClass, buttonText = "Приложить файл", onClose}) {

   const {isPending, sendData} = usePostRequest()

   const [fileName, setFileName] = useState("");
   const [fileError, setFileError] = useState("");
   const [isEditing, setIsEditing] = useState(false);
   const [isContactError, setIsContactError] = useState(false);
   const [contactErrorMessage, setContactErrorMessage] = useState("");
   const [errorMessage, setErrorMessage] = useState(null);

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      const fileErrorMsg = validateFile(file);
      setFileError(fileErrorMsg);
      setFileName(file.name);
   }

   const handleBlur = (contact) => {
      if (isContactError) {
         if (validateContact(contact)) {
            setIsContactError(false);
            setContactErrorMessage("");
         }
      }
      setIsEditing(false);
   }

   const prepareContact = (fd) => {
      const data = Object.fromEntries(fd);
      const {contact} = data;
      if (!validateContact(contact)) {
         setIsContactError(true);
         setContactErrorMessage("Ой! Похоже, Вы ошиблись");
         return false;
      }
      return true;
   }

   const handlePostResponse = (res, form) => {
      if (res.success) {
         form.reset();
         setFileName("");
         setFileError("");
         onClose?.();
      } else {
         setErrorMessage(res.message);
         setTimeout(() => setErrorMessage(null), 3000);
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      if (!prepareContact(fd)) return;
      const res = await sendData(fd, "client-request");
      handlePostResponse(res, e.target);
   }

   const handleTelegram = async (e) => {
      e.preventDefault();
      const form = e.target.closest("form");
      const fd = new FormData(form);
      if (!prepareContact(fd)) return;
      const res = await sendData(fd, "send-telegram");
      handlePostResponse(res, form);
   }

   return (
      <div className="contactFormContainer">
         <div className={styles.contactFormWrapper}>
            <button type="button" className={buttonClass} onClick={onClose}>
               &times;
            </button>
            <form className={styles.contactForm} method={"dialog"} onSubmit={handleSubmit}>
               {!errorMessage ? (
                  <>
                     <p>Привет JetStyle,</p>
                     <p>{message}</p>
                  </>
               ) : (
                  <>
                     <p className={styles.fileError}>{errorMessage}</p>
                     <p className={styles.fileError}>{" "}</p>
                  </>
               )}

               <div className={styles.userData}>
                  <div className={styles.contactInputBlock}>
                     <label className={styles.contactLabel} htmlFor={"name"}>Пожалуйста,
                        представьтесь<span>*</span></label>
                     <input
                        type={"text"} id={"name"} name={"name"} minLength={2} />
                  </div>

                  <div className={styles.contactInputBlock}>
                     <div className={styles.labelAndError}>
                        <label className={styles.contactLabel} htmlFor={"contact"}>Email или
                           Телефон<span>*</span></label>
                        {(isContactError && !isEditing) && <p className={styles.errorMsg}>{contactErrorMessage}</p>}
                     </div>
                     <input
                        type={"text"}
                        id={"contact"}
                        name={"contact"}
                        onFocus={() => setIsEditing(true)}
                        onBlur={(e) => handleBlur(e.target.value)}
                        required
                     />
                  </div>
               </div>

               <div className={styles.contactInputBlock}>
                  <label className={styles.contactLabel} htmlFor={"comments"}>Комментарий</label>
                  <textarea id={"comments"} name={"comments"}></textarea>
               </div>

               <div className={styles.contactInputBlock}>
                  <label className={`${styles.fileInput} ${fileError ? styles.fileError : ""}`} htmlFor={"file"}>
                     <img src={clip} alt={"clip image"}/>
                     {fileError || fileName || (
                        <>
                           {buttonText}{isMobile ? <span>(если нужно)</span> : ""}
                        </>
                     )}
                  </label>
                  <input
                     type={"file"}
                     id={"file"}
                     name={"file"}
                     hidden
                     onChange={handleFileChange}
                  />
               </div>
               <div className={styles.contactFormButtons}>
                  <button
                     className={"redButton"}
                     disabled={(fileError !== "") || isPending}>
                     Отправить
                  </button>
                  <button
                     className={styles.telegramButton}
                     type={"button"}
                     onClick={handleTelegram}
                     disabled={(fileError !== "") || isPending}
                  >
                     Написать в Telegram
                     <img src={telegram} alt={"telegram logo"}/>
                  </button>
               </div>
            </form>
            <p className={styles.agreement}>
               Нажимая кнопку, я даю согласие
               <a
                  href={privacyPolicy}
                  target={"_blank"}
                  rel={"noopener noreferrer"}> на&nbsp;обработку персональных данных
               </a>
            </p>
         </div>
      </div>
   );
}

export default ContactForm;