import styles from "./HeroSection.module.css"

function HeroSection() {
   return (
      <div className={styles.hero}>
         <div className={styles.heroContainer}>
            <h1 className={styles.heroHeader}>Калькулятор unit-экономики</h1>
            <p className={styles.heroParagraph}>Это мини-версия калькулятора, созданная нами чтобы иметь возможность
               наглядно пояснить концепцию
               юнит-экономики и быстро на примерах провалидировать гипотезы о том, сходится ли бизнес-модель в
               каком-либо конкретном рекламном канале.</p>
         </div>
      </div>
   );
}

export default HeroSection;