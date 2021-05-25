import express, { Router } from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import path from 'path'

const router = express.Router()
router.use(bodyParser.urlencoded({extended: true})) 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
    }
})

const upload = multer({ 
    storage: storage 
})

router.post('/uploadfile', upload.single('image'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please attach a file!')
      error.httpStatusCode = 400
      return next(error)
    }
    console.log(req.file);
    // res.send("File uploaded successfully")
    res.send(`/${req.file.path}`)
})

export default router;
   