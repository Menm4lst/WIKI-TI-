import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// Obtener todos los artículos con filtros opcionales
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      application, 
      status, 
      severity,
      sort = '-createdAt',
      limit = 50,
      page = 1 
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (application) filter.application = application;
    if (status) filter.status = status;
    if (severity) filter.severity = severity;

    const skip = (page - 1) * limit;

    const articles = await Article.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .select('-versions'); // No incluir versiones en listado

    const total = await Article.countDocuments(filter);

    res.json({
      articles,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener artículos más vistos (DEBE IR ANTES DE /:id)
router.get('/stats/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const articles = await Article.find({ status: 'publicado' })
      .sort('-views')
      .limit(limit)
      .select('title application views helpful category createdAt errorCode');

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un artículo por ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    // Incrementar contador de vistas
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo artículo
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar artículo (guarda versión anterior)
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    // Guardar versión anterior
    if (req.body.saveVersion) {
      article.saveVersion(
        req.body.editedBy || 'Anónimo',
        req.body.changeDescription
      );
    }

    // Actualizar campos
    Object.keys(req.body).forEach(key => {
      if (key !== 'saveVersion' && key !== 'changeDescription' && key !== 'editedBy') {
        article[key] = req.body[key];
      }
    });

    if (req.body.editedBy) {
      article.lastEditedBy = req.body.editedBy;
    }

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar artículo
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    res.json({ message: 'Artículo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener versiones de un artículo
router.get('/:id/versions', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).select('versions title');
    
    if (!article) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    res.json({
      title: article.title,
      versions: article.versions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar artículo como útil
router.post('/:id/helpful', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    article.helpful += 1;
    await article.save();

    res.json({ helpful: article.helpful });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
