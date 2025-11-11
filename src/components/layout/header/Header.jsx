import Navigation from "./header-small-components/Navigation.jsx";
import {useState} from "react";
import PhoneIcon from "../../../icons/PhoneIcon.jsx";
import SearchIcon from "../../../icons/SearchIcon.jsx";
import styles from "./Header.module.css";
import logo from "../../../assets/images/logo_white.png"

function Header() {
   const [showSearch, setShowSearch] = useState(false);
   const [language, setLanguage] = useState("Ru");

   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(prev => !prev);
   }

   return (
      <header className={styles.header}>
         <div className={styles.containerHeader}>
            <div className={styles.logo}>
               <div className={styles.inner}>
                  <img src={logo} alt="logo"/>
               </div>
            </div>
            <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            <div className={styles.rightMenu}>
               <a className={styles.servicesDesktop} href="/public">Услуги</a>
               <a className={styles.phoneDesktop} href="tel:+78002569897">8 800 256-98-97</a>
               <div className={styles.phoneMobile}>
                  <a href="tel:+78002569897"><PhoneIcon/></a>
               </div>
               <button className={styles.searchButton}
                       onClick={() => setShowSearch(prev => !prev)}>
                  <SearchIcon/>
               </button>
               {showSearch && (
                  <div className={styles.searchWindow}>
                     <input type="text"/>
                     <button onClick={() => setShowSearch(prev => !prev)}>Search</button>
                  </div>)}
               <button className={styles.lang}
                       onClick={() => setLanguage(prev => prev === "Ru" ? "En" : "Ru")}>
                  {language === "Ru" ? "En" : "Ru"}
               </button>

               <div className={styles.burgerDiv}>
                  <button
                     className={`${styles.burgerButton} ${isMenuOpen ? "open" : ''}`}
                     onClick={toggleMenu}>
                     <span></span>
                     <span></span>
                     <span></span>
                  </button>
               </div>

            </div>
         </div>
      </header>
   );
}

export default Header;