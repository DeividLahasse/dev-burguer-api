import * as Yup from 'yup';
import Category from '../models/category.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name } = request.body;
    const { filename } = request.file;

    const existngCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existngCategory) {
      return response.status(400).json({ eror: 'Category already existe' });
    }

    const newCategory = await Category.create({
      name,
      path: filename,
    });

    return response.status(201).json({ newCategory });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name } = request.body;
    const { id } = request.params;

    let path;
    if (request.file) {
      const { filename } = request.file;
      path = filename;
    }

    const existngCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existngCategory) {
      return response.status(400).json({ eror: 'Category already existe' });
    }

    await Category.update(
      {
        name,
        path,
      },
      {
        where: {
          id,
        },
      },
    );

    return response.status(201).json();
  }

  async index(_request, response) {
    const categories = await Category.findAll();

    console.log(_request.userId);

    return response.status(200).json(categories);
  }
}

export default new CategoryController();
