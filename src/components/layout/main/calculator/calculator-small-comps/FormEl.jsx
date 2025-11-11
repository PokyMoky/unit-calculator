function FormEl({abbr, value, onEdit}) {
   return (
      <label className="formulaLabel">
         <abbr className="abbr">{abbr}</abbr>
         <button
            className="formulaButton"
            type="button"
            aria-label={`Изменить значение ${abbr}`}
            onClick={() => onEdit(abbr)}
         >
            {abbr === "AU" && (value?.toLocaleString('ru-RU') || '0')}
            {abbr !== "AU" && (value?.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0,00")}
         </button>
      </label>
   );
}

export default FormEl;