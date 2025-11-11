import {useEffect, useState} from "react";

function CookieBanner() {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const accepted = localStorage.getItem("cookiesAccepted");
      if (!accepted) {
         setIsVisible(true);
      }
   }, []);

   const handleAccept = () => {
      localStorage.setItem("cookiesAccepted", "true");
      setIsVisible(false);
   };

   if (!isVisible) return null;

   return (
      <div className="cookie-banner">
         <p>На этом сайте мы используем cookies</p>
         <button onClick={handleAccept}>Хорошо</button>
      </div>
   );
}

export default CookieBanner;