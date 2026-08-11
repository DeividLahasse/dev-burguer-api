// const multer = require('multer');
// const { resolve } = require('node:path');
// const { v4 } = require('uuid');

// module.exports = {
//   storage: multer.diskStorage({
//     destination: resolve(__dirname, '..', '..', 'uploads'),
//     filename: (_request, file, callback) => {
//       const uniqueName = v4().concat(`-${file.originalname}`);
//       return callback(null, uniqueName);
//     },
//   }),
// };

const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configura o Cloudinary com as variáveis de ambiente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura o storage do Multer para enviar direto ao Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Nome da pasta lá no Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

module.exports = upload;
