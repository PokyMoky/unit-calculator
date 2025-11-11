import React, {useState} from 'react';
import styles from "./SubscribeForm.module.css";
import ChevronIcon from "../../icons/ChevronIcon.jsx";
import isEmail from "validator/lib/isEmail";
import usePostRequest from "../../hooks/usePostRequest.js";

function SubscribeForm() {
   const {isPending, sendData} = usePostRequest();
   const [isEditing, setIsEditing] = useState(false);
   const [validationError, setValidationError] = useState(false);
   const [isError, setIsError] = useState(false);
   const [feedBackMsg, setFeedBackMsg] = useState(null);

   const handleBlur = (e) => {
      setIsEditing(false);
      if (!isEmail(e.target.value)) {
         setValidationError(true);
      } else {
         setValidationError(false);
      }
   }


   const handleSubmitSubscribe = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const {email} = Object.fromEntries(fd);
      if (!isEmail(email)) {
         setValidationError(true);
         return
      }
      const res = await sendData({email}, "subscribe");
      if (res.success) {
         e.target.reset();
      }
      setIsError(res.success);
      setFeedBackMsg(res.message);

      setTimeout(() => {
         setFeedBackMsg(null);
         setIsError(false);
      }, 3000)
   }

   return (
      <form className={styles.newsSignUp} onSubmit={handleSubmitSubscribe}>
         <div className={styles.newsSignUpContainer}>
            <label htmlFor={"email"} className={feedBackMsg ? `${styles.feedBackMsg}` : ""}>
               {feedBackMsg || "Подпишитесь, чтобы получать наши последние новости"}
            </label>
            <div className={styles.newsSignUpInputBlock}>
               <input
                  type={"email"}
                  id={"email"}
                  name={"email"}
                  className={(validationError && !isEditing) ? `${styles.invalid}` : null}
                  placeholder={"Email"}
                  onFocus={() => setIsEditing(true)}
                  onBlur={handleBlur}
                  required
               />
               <button className={styles.newsSignUpBtn} disabled={isPending}>
                  <ChevronIcon width={18} height={9}/>
               </button>
            </div>
         </div>
      </form>
   );
}

export default SubscribeForm;