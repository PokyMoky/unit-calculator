import {unitInputData} from "../../utils/constants.js";
import {useRef, useState} from "react";
import styles from "./Tooltip.module.css"

function Tooltip({id, children, classname = ""}) {
   const [position, setPosition] = useState("top");
   const tooltipRef = useRef(null);
   const wrapperRef = useRef(null);
   const unit = unitInputData.find(unit => unit.id === id);

   function updateTooltipPosition() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const tooltipWidth = 448;
      const tooltipHeight = 216;

      const spaceTop = rect.top;
      const spaceBottom = window.innerHeight - rect.bottom;
      const spaceLeft = rect.left;
      const spaceRight = window.innerWidth - rect.right;

      let newPosition = "top";
      if (spaceTop < tooltipHeight && spaceBottom > spaceTop) newPosition = "bottom";
      if (spaceRight < tooltipWidth / 2 && spaceLeft > spaceRight) newPosition = "left";
      if (spaceLeft < tooltipWidth / 2 && spaceRight > spaceLeft) newPosition = "right";

      setPosition(newPosition);
   }

   return (
      <div
         ref={wrapperRef}
         className={`${styles.tooltip} ${styles[`tooltip-${position}`]} ${styles[classname]}`}
         onMouseEnter={updateTooltipPosition}
      >
         {children}
         {unit && (
            <div ref={tooltipRef} className={styles.tooltipText}>
               <h5>{unit.title}</h5>
               <p>{unit.prompt}</p>
            </div>
         )}
      </div>
   );
}

export default Tooltip;