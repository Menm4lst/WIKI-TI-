import express from 'express';
import Category from '../models/Category.js';
import Article from '../models/Article.js';

const router = express.Router();

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort('name');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva categoría
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar contador de artículos por categoría
router.get('/update-counts', async (req, res) => {
  try {
    const categories = await Category.find();
    
    for (const category of categories) {
      const count = await Article.countDocuments({ 
        category: category.name,
        status: 'publicado'
      });
      category.articleCount = count;
      await category.save();
    }

    res.json({ message: 'Contadores actualizados', categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener estadísticas por categoría
router.get('/stats', async (req, res) => {
  try {
    const stats = await Article.aggregate([
      { $match: { status: 'publicado' } },
      { 
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          avgHelpful: { $avg: '$helpful' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
