import Modal from "../../util-components/Modal.jsx";
import ContactForm from "../../forms/ContactForm.jsx";
import {useMediaQuery} from "react-responsive";
import styles from "./About.module.css"
import useModal from "../../../hooks/useModal.js";

function About() {
   const isMobile = useMediaQuery({maxWidth: 768});
   const {isOpen, open, close, modalRef} = useModal();


   return (
      <>
         {isOpen && (
            <Modal ref={modalRef} onClose={close} classname={"modal"}>
               <ContactForm
                  message="Я бы хотел проконсультироваться с вами по аналитике."
                  isMobile={isMobile}
                  buttonClass={"closeButton"}
                  onClose={close}
               />
            </Modal>
         )}
         <article className={styles.about}>
            <h2 className={styles.aboutHeader}>Что такое юнит&nbsp;экономика?</h2>
            <p>
               Если кратко — это методология, которая позволяет оценить сходимость экономики на конкретных цифрах. То
               есть,
               рассчитывая юнит-экономику, мы пытаемся оценить, масштабируем ли мы прибыль или убыток. Для этого мы
               оцениваем, сколько мы тратим на привлечение одного клиента в выбранном рекламном канале и сколько с него
               зарабатываем. А затем смотрим, как это работает в масштабе (на десятках, сотнях и тысячах привлеченных
               пользователей).
            </p>
            <h5 className={styles.aboutSubHeader}>Подробнее про юнит-экономику:</h5>
            <ul className={styles.aboutList}>
               <li>
                  <a className="aboutLink" href={"#"}>
                     Илья Красинский про юнит-экономику, точки роста и управление продуктом <span>(VC.ru)</span>
                  </a>
               </li>
               <li>
                  <a className={styles.aboutLink} href={"#"}>
                     Юнит-экономика — как посчитать и какие метрики использовать <span>(Блог Productstar)</span>
                  </a>
               </li>
               <li>
                  <a className={styles.aboutLink} href={"#"}>
                     Сколько стоит реклама в Яндекс.Директ? Разбираем, как и за что списываются деньги <span>(Блог Callibri)</span>
                  </a>
               </li>
               <li>
                  <a className={styles.aboutLink} href={"#"}>
                     Пример плана Product Discovery для проверки идеи «Предзаказ в
                     ресторанах» <span>(Denis Beskov)</span>
                  </a>
               </li>
               <li>
                  <a className={styles.aboutLink} href={"#"}>
                     Юнит-экономика: полный разбор <span>(Skillbox)</span>
                  </a>
               </li>
            </ul>
            <h4>Хочу применять подход в своем бизнесе, что мне потребуется?</h4>
            <div>
               <h5 className={styles.aboutSubHeader}>Для успешного применения методологии в бизнесе потребуются:</h5>
               <ul className={styles.aboutList}>
                  <li>
                     настроенная веб-аналитика для отслеживания действий пользователей на сайте (позволит оценить CPC по
                     каналам, CR1 — т. е. конверсию в заявку, и CPA);
                  </li>
                  <li>
                     CRM-система — позволит оценить доходную часть формулы (т. е. доход с привлеченных пользователей —
                     AvP,
                     CoGS, APC);
                  </li>
                  <li>
                     интеграция CRM с системой веб-аналитики (необходима, чтобы оценить CR2 — т. е. конверсию из заявки
                     в
                     продажу, в разрезе по рекламным каналам. Также это позволит строить аналитику в разрезе по каналам,
                     а
                     не в среднем. Для связи достаточно сохранять ClientID из веб-аналитики в CRM — это позволит
                     построить
                     сквозную аналитику на коленке при помощи Гугл-таблиц и некоторого терпения).
                  </li>
               </ul>
            </div>
            <h2 className={`${styles.aboutHeader} ${styles.questionsHeader}`}>Остались вопросы?</h2>
            <div className={`questions ${styles.questions}`}>
               <div className={styles.questionsContent}>
                  <h5 className={styles.aboutSubHeader}>Для успешного применения методологии в бизнесе потребуются:</h5>
                  <ul className={styles.aboutList}>
                     <li>Длительность консультации — 1 час.</li>
                     <li>Стоимость 6 000 рублей.</li>
                     <li>На связи — Евгений Кузнецов, диджитал-стратег JetStyle. Более 10 лет в интернет-маркетинге.
                     </li>
                  </ul>
                  <p>
                     На онлайн-встрече вы сможете задать вопросы о юнит-экономике и веб-аналитике, сформировать и
                     упорядочить
                     гипотезы, поделиться наболевшим.
                  </p>
                  <button className="redButton" onClick={() => open()}>Записаться</button>
               </div>
            </div>
         </article>
      </>
   );
}

export default About;