import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), 'uploads');

if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
}
const storage = multer.diskStorage({
    destination: (req, file, cb)=> cb(null, 'uploads/'),
    filename: (req, file, cb)=> {
        const name = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
        cb(null, name);
    }

})

export const upload = multer({storage});