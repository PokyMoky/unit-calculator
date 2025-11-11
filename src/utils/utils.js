export function formatCurrency(value) {
   if (value == null || !isFinite(value)) return "n/a";
   return `${value.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})}\u00A0₽`;
}

export function formatNumberInput(value) {

   const parts = value.replace(/[.,]/g, ".").split(".");
   const integerPart = parts[0].replace(/\s/g, "");

   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
   return parts.length > 1 ? `${formattedInteger}.${parts[1].slice(0, 2)}` : formattedInteger;
}

export function normalizeNumber(value) {
   return value.replace(/\s/g, "").replace(",", ".");
}