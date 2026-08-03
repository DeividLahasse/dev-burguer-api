import { Router } from 'express';
import multer from 'multer';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductsController from './app/controllers/ProductsController.js';
import SessionController from './app/controllers/SessionController.js';
import CreatPaymentIntentController from './app/controllers/stripe/CreatPaymentIntentController.js';
import UserController from './app/controllers/UserController.js';
import adminMiddlewar from './app/middlewares/admin.js';
import authMiddlewar from './app/middlewares/auth.js';
import multerConfig from './config/multer.cjs';

const routes = new Router();

const uploads = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.get('/products', ProductsController.index);

routes.get('/categories', CategoryController.index);

routes.use(authMiddlewar);

routes.post(
  '/products',
  adminMiddlewar,
  uploads.single('file'),
  ProductsController.store,
);

routes.put(
  '/products/:id',
  adminMiddlewar,
  uploads.single('file'),
  ProductsController.update,
);

routes.post(
  '/categories',
  adminMiddlewar,
  uploads.single('file'),
  CategoryController.store,
);

routes.put(
  '/categories/:id',
  adminMiddlewar,
  uploads.single('file'),
  CategoryController.update,
);

// routes.post('/orders', adminMiddlewar, OrderController.store);
routes.post('/orders', OrderController.store);

routes.get('/orders', adminMiddlewar, OrderController.index);

routes.put('/orders/:id', adminMiddlewar, OrderController.update);

routes.post('/create-payment-intent', CreatPaymentIntentController.store);

export default routes;
