import {useState} from "react";

function ShareButton() {
   const [buttonText, setButtonText] = useState("Поделиться");

   const handleShare = async () => {
      const url = window.location.href;

      if (navigator.share) {
         try {
            await navigator.share({
               title: document.title,
               url: url,
            });
         } catch (error) {
            console.error(error);
            setButtonText("Упс...");
            setTimeout(() => setButtonText("Поделиться"), 2000);
         }
      } else {
         try {
            await navigator.clipboard.writeText(url);
            setButtonText("Ссылка скопирована");
            setTimeout(() => setButtonText("Поделиться"), 2000);
         } catch (error) {
            console.error(error);
            setButtonText("Упс...");
            setTimeout(() => setButtonText("Поделиться"), 2000);
         }
      }
   };

   return (
      <button className="shareButton" onClick={handleShare}>
         {buttonText}
      </button>
   );
}

export default ShareButton;