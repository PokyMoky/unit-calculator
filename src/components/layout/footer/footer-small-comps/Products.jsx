import {products} from "../../../../utils/constants.js";
import ChevronIcon from "../../../../icons/ChevronIcon.jsx";
import styles from "./Products.module.css";

function Products() {
   return (
      <div className={styles.prods}>
         {products.map(({id, text, image, link}) => (
            <div className={styles.product} key={id}>
               <div>
                  <h3>
                     <img src={image} alt={`${name} logo`}/>
                  </h3>
                  <p>{text}</p>
               </div>
               <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Follow us on ${id}`}
               >
                  <ChevronIcon width={18} height={9}/>
               </a>
            </div>
         ))}
      </div>
   );
}

export default Products;