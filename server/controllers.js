import XLSX from "xlsx";
import {sendEmail} from "./utils/mailer.js";
import {fileTypeFromBuffer} from "file-type";
import validator from "validator";
import FormData from "form-data";
import axios from "axios";

import Contact from "./models/contact.js";
import {validateRussianPhone} from "./utils/phoneValidation.js";
import {ALLOWED_FILE_TYPE} from "./utils/serverConstants.js";
import Subscriber from "./models/subscriber.js";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

export const subscribeNews = async (req, res, next) => {
   const email = req.body.email;
   if (!validator.isEmail(email)) {
      throw new Error("Некорректный email");
   }

   try {
      let subscriber = await Subscriber.findOne({email: email});
      if (subscriber) {
         const error = new Error("Вы уже подписаны");
         error.status = 422;
         throw error;
      } else {
         subscriber = new Subscriber({email});
      }
      await subscriber.save();
      res.status(200).json({message: "Вы успешно подписались"});
   } catch (error) {
      next(error);
   }
}

export const sendTelegram = async (req, res, next) => {
   try {
      const {name, contact, comments, contactDB} =
         await saveClientRequestToDB(req);
      const file = req.file;

      const caption = `Имя: ${name}\nКонтакт: ${contact}\nКомментарий: ${comments || "—"}`;

      let response;
      if (file) {
         const formData = new FormData();
         formData.append("chat_id", CHAT_ID);
         formData.append("caption", caption);
         formData.append("document", file.buffer, file.originalname);

         response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
            formData,
            { headers: formData.getHeaders() }
         );
      } else {
         response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
               chat_id: CHAT_ID,
               text: caption,
            }
         );
      }

      if (response.status === 200) {
         const currentRequest = contactDB.requests[contactDB.requests.length - 1];
         currentRequest.sentToCrmOrTelegram = true;
         try {
            await contactDB.save();
         } catch (e) {
            console.error(e);
         }
      }

      res.status(201).json({message: "Данные отправлены"})
   } catch (e) {
      next(e);
   }
}

export const handleClientRequest = async (req, res, next) => {
   try {
      const {name, contact, comments, fileBuffer, contactDB} =
         await saveClientRequestToDB(req);

      sendToCrm({name, contact, comments, fileBuffer})
         .then(result => {
            if (result.success) {
               const currentRequest = contactDB.requests[contactDB.requests.length - 1];
               currentRequest.sentToCrmOrTelegram = true;
               return contactDB.save();
            }
         })
         .catch(err => console.error(err));

      res.status(201).json({message: "ok"});
   } catch (e) {
      next(e);
   }
}

export const sendExcelEmail = async (req, res, next) => {
   const {email, title, data} = req.body;
   const buffer = createExcelBuffer(data, title);

   try {
      await sendEmail(email, buffer);
      res.status(200).json({message: "File was sent successfully"});
   } catch (error) {
      error.message = "Упс... Не удалось отправить файл";
      next(error);
   }
}

const createExcelBuffer = (data, title) => {
   const worksheet = XLSX.utils.aoa_to_sheet(data);
   const workbook = XLSX.utils.book_new();
   const sheetName = title?.slice(0, 31).replace(/[\\/*?:[\]]/g, "") || "Sheet1";
   XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

   return XLSX.write(workbook, {
      bookType: 'xlsx',
      type: "buffer"
   });
}

const sendToCrm = async (clientRequest) => {
   try {
      await axios.post("http://localhost:3001/api/crm", clientRequest);
      return {success: true};
   } catch (e) {
      return {success: false, error: e};
   }
}

const saveClientRequestToDB = async (req) => {
   const {name, contact, comments} = req.body;
   const file = req.file;

   if (!name) {
      const error = new Error("Пожалуйста, укажите имя");
      error.status = 422;
      throw error;
   }

   let email;
   let phone;
   if (validator.isEmail(contact)) {
      email = validator.normalizeEmail(contact);
   } else if (validateRussianPhone(contact.trim())) {
      phone = contact;
   } else {
      const error = new Error("Пожалуйста, укажите контактные данные");
      error.status = 422;
      throw error;
   }

   let fileBuffer = null;
   if (file) {
      const fileType = await fileTypeFromBuffer(file.buffer);
      if (!fileType || !ALLOWED_FILE_TYPE.includes(fileType.mime)) {
         const error = new Error("Недопустимый тип файла");
         error.status = 415;
         throw error;
      }
      fileBuffer = file.buffer;
   }

   let contactDB = await Contact.findOne({$or: [{email}, {phone}]});
   if (!contactDB) {
      contactDB = new Contact({
         name, email, phone,
         requests: [{comments, file: fileBuffer}]
      });
   } else {
      contactDB.requests.push({comments, file: fileBuffer});
   }

   await contactDB.save();

   return {name, contact, comments, fileBuffer, contactDB};
}