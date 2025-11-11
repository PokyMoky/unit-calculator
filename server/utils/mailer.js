import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const emailText = "Ваш файл с расчетами находится во вложенном файле";
const filename = "calculation.xlsx";
const subject = "Расчет юнит-экономики"

// ethereal is used as a mail service for testing purposes
export const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: 587,
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
   }
});

export const sendEmail = (to, content) => {
   return transporter.sendMail({
      to,
      from: process.env.EMAIL_USER,
      subject,
      text: emailText,
      attachments: [{
         filename: filename,
         content,
         contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }]
   });
}