import multer from 'multer';
import {ALLOWED_FILE_TYPE, MAX_FILE_SIZE} from "../utils/serverConstants.js";


const upload = multer({
   storage: multer.memoryStorage(),
   limits: {fileSize: MAX_FILE_SIZE * 1024 * 1024},
   fileFilter: (req, file, cb) => {
      if (!ALLOWED_FILE_TYPE.includes(file.mimetype)) {
         return cb(new Error("Недопустимый тип файла"));
      }
      cb(null, true);
   }
});

export default upload;