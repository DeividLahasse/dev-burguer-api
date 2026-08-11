import cors from 'cors';
import express from 'express';
import fileRoutesConfig from './config/fileRoutes.cjs';
import routes from './routes.js';
import 'dotenv/config';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRoutesConfig);
app.use('/category-file', fileRoutesConfig);

app.use(routes);

// Handler de erro global — captura qualquer erro não tratado (inclusive do multer/cloudinary)
app.use((err, request, response, next) => {
  console.error('Erro não tratado:', err);
  response.status(500).json({ error: err.message || 'Erro interno no servidor' });
});

export default app;
