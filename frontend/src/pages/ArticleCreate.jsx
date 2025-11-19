import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX } from 'react-icons/fi';
import { articleAPI } from '../services/api';

export default function ArticleCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    application: '',
    errorCode: '',
    category: 'solucion',
    tags: '',
    severity: 'media',
    author: 'Técnico IT',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Procesar tags
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const articleData = {
        ...formData,
        tags: tagsArray,
      };

      const response = await articleAPI.create(articleData);
      navigate(`/articles/${response.data._id}`);
    } catch (error) {
      console.error('Error creando artículo:', error);
      alert('Error al crear el artículo. Por favor verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Artículo</h1>
        <p className="text-gray-600 mt-2">
          Documenta una solución, error, incidencia o procedimiento
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
            placeholder="Ej: Error de conexión en SAP - Código RFC_ERROR_SYSTEM_FAILURE"
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
                placeholder="Ej: SAP, Oracle, Salesforce..."
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
                placeholder="Ej: ERR-500, RFC_ERROR..."
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
                Autor *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
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
              placeholder="Ej: sap, conexion, rfc, error"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Los tags ayudan a encontrar el artículo más fácilmente
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
            placeholder="Describe el problema, la solución paso a paso, capturas de pantalla relevantes...

## Descripción del Problema
Explica qué sucedió...

## Solución
1. Primer paso
2. Segundo paso
3. Tercer paso

## Notas Adicionales
Información adicional relevante..."
            className="input-field font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Puedes usar Markdown para formato: **negrita**, *cursiva*, `código`, # títulos, listas, etc.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center space-x-2"
          >
            <FiX className="w-4 h-4" />
            <span>Cancelar</span>
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave className="w-4 h-4" />
            <span>{loading ? 'Guardando...' : 'Crear Artículo'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
