import Contact from "../models/contact.js";
import axios from "axios";

const RECHECK_INTERVAL_MS = 5 * 60 * 1000;

const sendPendingRequestsToCrm = async () => {
   try {
      const contacts = await Contact.find({"requests.sentToCrmOrTelegram": false});

      for (const contact of contacts) {
         for (const request of contact.requests) {
            if (request.sentToCrmOrTelegram) continue;

            const payload = {
               name: contact.name,
               contact: contact.phone || contact.email,
               comments: request.comments,
               file: request.file ? request.file.toString("base64") : null,
            };

            try {
               const response = await axios.post("http://localhost:3001/api/crm", payload);
               if (response.status >= 200 && response.status < 300) {
                  request.sentToCrmOrTelegram = true;
                  await contact.save();
               }
            } catch (e) {
               console.error(e.message);
            }
         }
      }
   } catch (error) {
      console.error(error.message);
   }
};


export const startCronJobs = () => {
   setInterval(sendPendingRequestsToCrm, RECHECK_INTERVAL_MS);
};