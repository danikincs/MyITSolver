import express from 'express';
const router = express.Router();
import multer from "multer";

import path from "path";
import fs from "fs";

//Basic error handler
const handleError = (err: any, res : any) => {
    console.log("error a handleerror", err)
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };

const upload = multer({
    dest: "./static"
  });


//Upload logic with jpeg jpg and png support
router.post(
    "/upload",
    upload.single("img"),
    (req, res) => {
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, "../static/" + req.file.originalname.toLocaleLowerCase());
      const extension = path.extname(req.file.originalname).toLowerCase()
  
      if (extension === ".png" || extension === ".jpeg" || extension === ".jpg") {
        fs.rename(tempPath, targetPath, err => {

          if (err) {
            return handleError(err, res);
          }
  
          res
            .status(200)
            .contentType("text/plain")
            .end(targetPath);
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) {
            return handleError(err, res);
          }
  
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png, .jpg, .jpeg files are allowed!");
        });
      }
    }
  );

export default router;