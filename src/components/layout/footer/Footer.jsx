import styles from "./Footer.module.css"
import SocialLinks from "./footer-small-comps/SocialLinks.jsx";
import ContactForm from "../../forms/ContactForm.jsx";
import {address, footerLinks, footerNavigation, privacyPolicy} from "../../../utils/constants.js";
import Products from "./footer-small-comps/Products.jsx";
import {useMediaQuery} from "react-responsive";
import SubscribeForm from "../../forms/SubscribeForm.jsx";
import Modal from "../../util-components/Modal.jsx";
import useModal from "../../../hooks/useModal.js";

function Footer() {
   const showForm = useMediaQuery({minWidth: 577});
   const {close, modalRef, isOpen, open} = useModal();

   return (
      <>
         {isOpen && (
            <Modal ref={modalRef} onClose={close} classname={"modal"}>
               <ContactForm
                  message={"Я хотел бы обсудить с вами проект."}
                  isMobile={true}
                  buttonClass={"closeButton"}
                  onClose={close}
               />
            </Modal>
         )}
         <footer>
            <div className={styles.footerWrapper}>
               <SubscribeForm/>
               <div className={styles.contacts}>
                  <div className={styles.socialWrapper}>
                     <a className={styles.phone} href="tel:+78002569897">8 800 365-78-79</a>
                     <a className={styles.email}>info+site@jetstyle.ru</a>
                     <SocialLinks/>
                  </div>
                  <div className={styles.addressWrapper}>
                     {showForm ? (
                        <div className={styles.contactFormWrapper}>
                           <ContactForm
                              message={"Я хотел бы обсудить с вами проект."}
                              buttonClass={"hidden"}
                              buttonText={"Добавить файл"}
                           />
                        </div>
                     ) : (
                        <button
                           className={`redButton ${styles.sendEmailBtn}`}
                           onClick={() => open()}
                        >
                           Напишите нам
                        </button>
                     )}
                     <div className={styles.addrContainer}>
                        {address.map(({id, name, address, image}) => (
                           <div key={id} className={styles[name]}>
                              <img src={image} alt={`${name} image`}/>
                              <p className={styles.red}>{name}</p>
                              <p className={styles.address}>{address}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className={styles.linksWrapper}>
                  <Products/>
                  <div className={styles.navWrapper}>
                     <div className={styles.navContainer}>
                        <ul className={styles.navigation}>
                           {footerNavigation.map(({id, title, link}) => (
                              <li key={id}>
                                 <a className={styles.link} href={link}>{title}</a>
                              </li>
                           ))}
                        </ul>
                        <ul className={styles.footerLinksNarrow}>
                           {footerLinks[1].map(({id, title, link}) => (
                              <li key={id}>
                                 <a className={styles.link} href={link}>{title}</a>
                              </li>
                           ))}
                        </ul>
                        <ul className={styles.footerLinksWide}>
                           {footerLinks[0].map(({id, title, link}) => (
                              <li key={id}>
                                 <a className={styles.link} href={link}>{title}</a>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div>
                        <p className={styles.policy}>
                           <a href={privacyPolicy} target="_blank" rel="noopener noreferrer">
                              Политика конфиденциальности
                           </a>
                        </p>
                        <div className={styles.copyright}>
                           <p className={styles.policy}>
                              Jetstyle (ООО «БИП»)
                           </p>
                           <p className={styles.policy}>
                              © 2004&mdash;2025
                           </p>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </>
   );
}

export default Footer;