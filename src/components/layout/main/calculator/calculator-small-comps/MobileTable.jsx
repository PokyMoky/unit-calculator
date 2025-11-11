import styles from "../calculator-sub-comps/ComparisonTable.module.css"

const defineClass = (header, value) => {
   if (header === "PPPU\u00A0₽") return value < 0 ? styles.red : styles.green;
   return '';
};

export default function MobileTable({ tableData }) {
   const headers = tableData[0];
   const rows = tableData.slice(1);

   const rotatedData = headers.slice(1).map((header, colIdx) => [
      header,
      ...rows.map(row => row[colIdx + 1])
   ]);

   return (
      <table className={styles.responsiveTable}>
         <thead>
         <tr>
            <th className={styles.cornerCell}>Расчеты</th>
            {rows.map((row, idx) => (
               <th key={idx}>{row[0]}</th>
            ))}
         </tr>
         </thead>
         <tbody>
         {rotatedData.map((row, rowIdx) => (
            <tr key={rowIdx}>
               <td className={styles.fieldLabel}>{row[0]}</td>
               {row.slice(1).map((cell, cellIdx) => (
                  <td
                     key={cellIdx}
                     className={`${styles.dataCell} ${defineClass(headers[rowIdx + 1], cell)}`}
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