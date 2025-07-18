// lib/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // we'll use buffer instead of saving locally

const upload = multer({ storage });

export default upload;
