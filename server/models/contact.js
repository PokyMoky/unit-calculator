import mongoose from 'mongoose';
import {Buffer} from "buffer";

const contactSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      unique: true,
   },
   phone: {
      type: String,
      unique: true,
   },
   requests: [{
      date: {
         type: Date,
         default: Date.now,
         required: true
      },
      comment: String,
      file: Buffer,
      sentToCrmOrTelegram: {
         type: Boolean,
         default: false
      }
   },]
});

const Contact = mongoose.model('PotentialClient', contactSchema);

export default Contact;