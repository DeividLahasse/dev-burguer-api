import * as Yup from 'yup';
import Category from '../models/Category.js';

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

    try {
      const { name } = request.body;

      if (!request.file) {
        return response.status(400).json({ error: 'Arquivo de imagem não enviado' });
      }

      const path = request.file.path;

      const existngCategory = await Category.findOne({
        where: { name },
      });

      if (existngCategory) {
        return response.status(400).json({ error: 'Category already exists' });
      }

      const newCategory = await Category.create({
        name,
        path,
      });

      return response.status(201).json({ newCategory });
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
      return response.status(500).json({ error: err.message || 'Erro interno ao criar categoria' });
    }
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
      path = request.file.path;
    }

    const existngCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existngCategory) {
      return response.status(400).json({ error: 'Category already exists' });
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

    return response.status(200).json(categories);
  }
}

export default new CategoryController();
