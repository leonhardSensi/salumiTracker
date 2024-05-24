import { Request } from "express";
import multer from "multer";
import uuid from "../utils/uuid";

// Salumi picture upload

const multerStorage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, `${__dirname}/../../public/salumePictures`);
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `salume-${uuid()}-${Date.now()}.${ext}`;
    req.body.image = filename;
    // req.body.images = [];
    cb(null, filename);
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 5, files: 1 },
});

// Profile picture upload

const multerProfileStorage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, `${__dirname}/../../public/profilePictures`);
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `profilePicture-${uuid()}-${Date.now()}.${ext}`;
    req.body.photo = filename;
    console.log("PHOTO", req.body.photo);

    // req.body.photos = [];
    cb(null, filename);
  },
});

const multerProfileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  cb(null, true);
};

const profileUpload = multer({
  storage: multerProfileStorage,
  fileFilter: multerProfileFilter,
  limits: { fileSize: 1024 * 1024 * 5, files: 1 },
});

// exports

export const uploadPostImageDisk = upload.single("image");
export const uploadProfilePictureDisk = profileUpload.single("photo");
