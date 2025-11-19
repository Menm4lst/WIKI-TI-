import mongoose from 'mongoose';

const versionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  editedBy: {
    type: String,
    required: true
  },
  editedAt: {
    type: Date,
    default: Date.now
  },
  changeDescription: String
});

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  application: {
    type: String,
    required: true,
    trim: true
  },
  errorCode: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['incidencia', 'error', 'solucion', 'procedimiento', 'configuracion', 'mantenimiento']
  },
  tags: [{
    type: String,
    trim: true
  }],
  severity: {
    type: String,
    enum: ['baja', 'media', 'alta', 'critica'],
    default: 'media'
  },
  status: {
    type: String,
    enum: ['borrador', 'publicado', 'archivado'],
    default: 'publicado'
  },
  author: {
    type: String,
    required: true
  },
  lastEditedBy: String,
  versions: [versionSchema],
  views: {
    type: Number,
    default: 0
  },
  helpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índices para búsqueda eficiente
articleSchema.index({ title: 'text', content: 'text', tags: 'text' });
articleSchema.index({ application: 1, category: 1 });
articleSchema.index({ errorCode: 1 });

// Método para guardar versión antes de actualizar
articleSchema.methods.saveVersion = function(editedBy, changeDescription) {
  this.versions.push({
    content: this.content,
    editedBy: this.lastEditedBy || this.author,
    editedAt: this.updatedAt,
    changeDescription
  });
  this.lastEditedBy = editedBy;
};

const Article = mongoose.model('Article', articleSchema);

export default Article;
