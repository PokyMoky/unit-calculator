import styles from "../calculator-sub-comps/ComparisonTable.module.css"

const defineClass = (header, value) => {
   if (header === "PPPU\u00A0₽") return value < 0 ? styles.red : styles.green;
   return '';
};

export default function DesktopTable({ tableData }) {
   const headers = tableData[0];
   const rows = tableData.slice(1);

   return (
      <table className={styles.responsiveTable}>
         <thead>
         <tr>
            {headers.map((header, idx) => (
               <th key={idx} className={idx === 0 ? styles.cornerCell : ''}>
                  {header}
               </th>
            ))}
         </tr>
         </thead>
         <tbody>
         {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
               {row.map((cell, cellIdx) => (
                  <td
                     key={cellIdx}
                     className={`${cellIdx === 0 ? 
                        styles.calcHeader : styles.dataCell} 
                        ${defineClass(headers[cellIdx], cell)}`}
                  >
                     {typeof cell === 'number'
                        ? cell.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : cell
                     }
                  </td>
               ))}
            </tr>
         ))}
         </tbody>
      </table>
   );
}
