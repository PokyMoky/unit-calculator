import {useState} from "react";
import styles from "./Navigation.module.css"
import {leftMenu} from "../../../../utils/constants.js";
import ChevronIcon from "../../../../icons/ChevronIcon.jsx";

function Navigation({isMenuOpen, setIsMenuOpen}) {
   const [activeItem, setActiveItem] = useState('we');
   const [openDropdown, setOpenDropdown] = useState(null);

   const handleItemClick = (top) => {
      setActiveItem(top);
      setOpenDropdown(null);
      setIsMenuOpen(false);
   };

   const toggleDropdown = (itemId) => {
      setOpenDropdown(openDropdown === itemId ? null : itemId);
      setActiveItem(itemId);
   };

   return (
      <>
      <nav className={styles.nav}>
         <div className="test">
         <div className={`${styles.menuContainer} ${isMenuOpen ?
            styles.menuOpen : ''}`}>
            {leftMenu.map((item) => (
               <div key={item.id} className={styles.menuItemWrapper}>

                  {item.submenu ? (
                     <div>
                        <button
                           onClick={() => toggleDropdown(item.id)}
                           className={`${styles.dropdownButton} ${activeItem === item.id ? 
                              styles.active : ""}`}>
                           <span className="dropdown-label">{item.label}</span>
                           <ChevronIcon rotated={openDropdown === item.id}/>
                        </button>

                        {openDropdown === item.id && (
                           <div className={styles.dropdown}>
                              {item.submenu.map((subItem) => (
                                 <a
                                    key={subItem.id}
                                    href={subItem.href}
                                    onClick={() => handleItemClick(subItem.top)}
                                    className={styles.dropdownItem}
                                 >
                                    {subItem.label}
                                 </a>
                              ))}
                           </div>
                        )}
                     </div>
                  ) : (
                     <a
                        href={item.href}
                        onClick={() => handleItemClick(item.top)}
                        className={`${styles.menuItem} ${activeItem === item.id 
                           ? styles.active : ""}`}>
                        {item.label}
                     </a>
                  )}
               </div>
            ))}
         </div>
         </div>
      </nav>
      </>
   );
}

export default Navigation;