import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiX } from 'react-icons/fi';
import { articleAPI } from '../services/api';

export default function ArticleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    application: '',
    errorCode: '',
    category: 'solucion',
    tags: '',
    severity: 'media',
    changeDescription: '',
    editedBy: 'Técnico IT',
  });

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const response = await articleAPI.getById(id);
      const article = response.data;
      
      setFormData({
        title: article.title,
        content: article.content,
        application: article.application,
        errorCode: article.errorCode || '',
        category: article.category,
        tags: article.tags ? article.tags.join(', ') : '',
        severity: article.severity,
        changeDescription: '',
        editedBy: article.lastEditedBy || article.author,
      });
    } catch (error) {
      console.error('Error cargando artículo:', error);
      alert('Error al cargar el artículo');
      navigate('/articles');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      // Procesar tags
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const articleData = {
        title: formData.title,
        content: formData.content,
        application: formData.application,
        errorCode: formData.errorCode,
        category: formData.category,
        tags: tagsArray,
        severity: formData.severity,
        saveVersion: true,
        editedBy: formData.editedBy,
        changeDescription: formData.changeDescription || 'Actualización del artículo',
      };

      await articleAPI.update(id, articleData);
      navigate(`/articles/${id}`);
    } catch (error) {
      console.error('Error actualizando artículo:', error);
      alert('Error al actualizar el artículo. Por favor verifica los datos.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600">Cargando artículo...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Editar Artículo</h1>
        <p className="text-gray-600 mt-2">
          Los cambios se guardarán en el historial de versiones
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título del Artículo *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Metadata */}
        <div className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aplicación *
              </label>
              <input
                type="text"
                name="application"
                value={formData.application}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Error (opcional)
              </label>
              <input
                type="text"
                name="errorCode"
                value={formData.errorCode}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="incidencia">Incidencia</option>
                <option value="error">Error</option>
                <option value="solucion">Solución</option>
                <option value="procedimiento">Procedimiento</option>
                <option value="configuracion">Configuración</option>
                <option value="mantenimiento">Mantenimiento</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severidad *
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Editado por *
              </label>
              <input
                type="text"
                name="editedBy"
                value={formData.editedBy}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (separados por coma)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del cambio
            </label>
            <input
              type="text"
              name="changeDescription"
              value={formData.changeDescription}
              onChange={handleChange}
              placeholder="Ej: Agregada información sobre nueva solución"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Esta descripción aparecerá en el historial de versiones
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido * (Markdown soportado)
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={20}
            className="input-field font-mono text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(`/articles/${id}`)}
            className="btn-secondary flex items-center space-x-2"
          >
            <FiX className="w-4 h-4" />
            <span>Cancelar</span>
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave className="w-4 h-4" />
            <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
