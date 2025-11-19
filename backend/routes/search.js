import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// Búsqueda general
router.get('/', async (req, res) => {
  try {
    const { 
      q,              // Búsqueda de texto
      application,    // Filtro por aplicación
      errorCode,      // Filtro por código de error
      category,       // Filtro por categoría
      tags,           // Filtro por tags (separados por coma)
      severity,       // Filtro por severidad
      limit = 20 
    } = req.query;

    const filter = { status: 'publicado' };

    // Búsqueda de texto completo
    if (q) {
      filter.$text = { $search: q };
    }

    // Filtros específicos
    if (application) {
      filter.application = { $regex: application, $options: 'i' };
    }

    if (errorCode) {
      filter.errorCode = { $regex: errorCode, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    if (severity) {
      filter.severity = severity;
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }

    const articles = await Article.find(filter)
      .limit(parseInt(limit))
      .select('-versions -content')
      .sort(q ? { score: { $meta: 'textScore' } } : '-createdAt');

    res.json({
      results: articles,
      count: articles.length,
      query: req.query
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las aplicaciones únicas
router.get('/applications/list', async (req, res) => {
  try {
    const applications = await Article.distinct('application');
    res.json(applications.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los códigos de error únicos
router.get('/errorcodes/list', async (req, res) => {
  try {
    const errorCodes = await Article.distinct('errorCode', { errorCode: { $ne: null, $ne: '' } });
    res.json(errorCodes.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los tags únicos
router.get('/tags/list', async (req, res) => {
  try {
    const tags = await Article.distinct('tags');
    res.json(tags.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Búsqueda de sugerencias (autocompletado)
router.get('/suggestions', async (req, res) => {
  try {
    const { q, field = 'title' } = req.query;

    if (!q || q.length < 2) {
      return res.json([]);
    }

    const filter = { 
      [field]: { $regex: q, $options: 'i' },
      status: 'publicado'
    };

    const suggestions = await Article.find(filter)
      .limit(5)
      .select(field)
      .lean();

    res.json(suggestions.map(item => item[field]));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
