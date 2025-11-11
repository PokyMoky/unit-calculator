import validator from "validator/es";
import isEmail from "validator/lib/isEmail";
import {ALLOWED_FILE_TYPE, MAX_FILE_SIZE} from "./constants.js";

export const getValidationMessage = (field) => {
   switch (field) {
      case "AU":
         return "AU должно быть целым неотрицательным числом.";
      case "CR1":
      case "CR2":
      case "Ret":
         return "Значение должно быть числом от 0 до 100.";
      case "CPC":
      case "AVP":
      case "COGS":
         return "Значение должно быть неотрицательным числом.";
      default:
         return "";
   }
};

export const validateValue = (field, value) => {
   const num = parseFloat(value);
   if (isNaN(num)) return false;
   if (num < 0) return false;

   switch (field) {
      case "AU":
         return Number.isInteger(num);
      case "CR1":
      case "CR2":
      case "Ret":
         return num <= 100;
      case "CPC":
      case "AVP":
      case "COGS":
         return true;
      default:
         return true;
   }
};

export const validateRussianPhone = (phone) => {
   let normalized = phone.replace(/\s|\(|\)|-/g, "");
   if (/^8\d{10}$/.test(normalized)) normalized = "+7" + normalized.slice(1);
   return validator.isMobilePhone(normalized, "ru-RU", { strictMode: true });
}

export const validateContact = (c) => isEmail(c) || validateRussianPhone(c.trim());

export const validateFile = (file) => {
   const { size, type } = file;
   if (size > MAX_FILE_SIZE * 1024 * 1024) return "Файл слишком большой";
   if (!ALLOWED_FILE_TYPE.includes(type)) return "Недопустимый тип файла";
   return "";
}