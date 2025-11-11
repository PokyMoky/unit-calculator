import validator from "validator";

export const validateRussianPhone = (phone) => {
   let normalized = phone.replace(/\s|\(|\)|-/g, "");
   if (/^8\d{10}$/.test(normalized)) normalized = "+7" + normalized.slice(1);
   return validator.isMobilePhone(normalized, "ru-RU", { strictMode: true });
}