import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept images, PDFs, ZIP files, and STL files
  const allowedTypes = /jpeg|jpg|png|pdf|zip|stl|gerber|rar/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype) || 
                   file.mimetype === 'application/octet-stream' || // for .stl files
                   file.mimetype === 'model/stl' ||
                   file.mimetype === 'application/x-zip-compressed' ||
                   file.mimetype === 'application/x-rar-compressed';

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image, PDF, ZIP, STL, and Gerber files are allowed!'));
  }
};

// Create multer instance
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: fileFilter
});
