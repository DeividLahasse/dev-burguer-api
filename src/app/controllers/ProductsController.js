// import * as Yup from 'yup';
// import Category from '../models/Category.js';
// import Product from './../models/Product.js';

// class ProductsController {
//   async store(request, response) {
//     const schema = Yup.object({
//       name: Yup.string().required(),
//       price: Yup.number().required(),
//       category_id: Yup.string().required(),
//       offer: Yup.boolean(),
//     });
//     try {
//       schema.validateSync(request.body, { abortEarly: false });
//     } catch (err) {
//       return response.status(400).json({ error: err.errors });
//     }

//     const { name, price, category_id, offer } = request.body;
//     const { filename } = request.file;

//     const newProduct = await Product.create({
//       name,
//       price,
//       category_id,
//       path: filename,
//       offer,
//     });

//     return response.status(201).json({ newProduct });
//   }

//   async update(request, response) {
//     const schema = Yup.object({
//       name: Yup.string(),
//       price: Yup.number(),
//       category_id: Yup.string(),
//       offer: Yup.boolean(),
//     });
//     try {
//       schema.validateSync(request.body, { abortEarly: false });
//     } catch (err) {
//       return response.status(400).json({ error: err.errors });
//     }

//     const { name, price, category_id, offer } = request.body;

//     const { id } = request.params;

//     let path;
//     if (request.file) {
//       const { filename } = request.file;
//       path = filename;
//     }

//     await Product.update(
//       {
//         name,
//         price,
//         category_id,
//         path,
//         offer,
//       },
//       {
//         where: {
//           id,
//         },
//       },
//     );

//     return response.status(201).json();
//   }

//   async index(_request, response) {
//     const products = await Product.findAll({
//       include: {
//         model: Category,
//         as: 'category',
//         attributes: ['id', 'name'],
//       },
//     });

//     console.log(_request.userId);

//     return response.status(200).json(products);
//   }
// }

// export default new ProductsController();

import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from './../models/Product.js';

class ProductsController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.string().required(),
      offer: Yup.boolean(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, price, category_id, offer } = request.body;

    // O Cloudinary retorna a URL completa diretamente em request.file.path
    const path = request.file ? request.file.path : null;

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return response.status(201).json({ newProduct });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.string(),
      offer: Yup.boolean(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, price, category_id, offer } = request.body;
    const { id } = request.params;

    let path;
    if (request.file) {
      path = request.file.path; // Pega a URL nova do Cloudinary se houver arquivo
    }

    const updateData = {
      name,
      price,
      category_id,
      offer,
    };

    if (path) {
      updateData.path = path;
    }

    await Product.update(updateData, {
      where: {
        id,
      },
    });

    return response.status(200).json();
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });

    return response.status(200).json(products);
  }
}

export default new ProductsController();
