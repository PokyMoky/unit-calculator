import express from "express";
import {handleClientRequest, sendExcelEmail, sendTelegram, subscribeNews} from "./controllers.js"
import upload from "./middlewares/upload.js";

const router = express.Router();

router.post("/download-file", sendExcelEmail);

router.post("/client-request", upload.single("file"), handleClientRequest);

router.post("/send-telegram", upload.single("file"), sendTelegram);

router.post("/subscribe", subscribeNews)

router.post("/crm", (req, res) => {
   const {name} = req.body;
   console.log(`Получена заявка от ${name}`);
   res.status(200).json({message: `Получена заявка от ${name}`})
})

export default router;