import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiThumbsUp, FiEye, FiCalendar, FiUser, FiClock, FiAlertCircle } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { articleAPI } from '../services/api';

const categoryColors = {
  incidencia: 'bg-red-100 text-red-800',
  error: 'bg-orange-100 text-orange-800',
  solucion: 'bg-green-100 text-green-800',
  procedimiento: 'bg-blue-100 text-blue-800',
  configuracion: 'bg-purple-100 text-purple-800',
  mantenimiento: 'bg-gray-100 text-gray-800',
};

const severityColors = {
  baja: 'bg-gray-100 text-gray-700',
  media: 'bg-yellow-100 text-yellow-800',
  alta: 'bg-orange-100 text-orange-800',
  critica: 'bg-red-100 text-red-800',
};

export default function ArticleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHelpful, setIsHelpful] = useState(false);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const response = await articleAPI.getById(id);
      setArticle(response.data);
    } catch (error) {
      console.error('Error cargando artículo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      try {
        await articleAPI.delete(id);
        navigate('/articles');
      } catch (error) {
        console.error('Error eliminando artículo:', error);
        alert('Error al eliminar el artículo');
      }
    }
  };

  const handleMarkHelpful = async () => {
    if (isHelpful) return;
    
    try {
      const response = await articleAPI.markHelpful(id);
      setArticle({ ...article, helpful: response.data.helpful });
      setIsHelpful(true);
    } catch (error) {
      console.error('Error marcando como útil:', error);
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

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Artículo no encontrado</p>
        <Link to="/articles" className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium">
          Volver a artículos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`badge ${categoryColors[article.category]}`}>
                {article.category}
              </span>
              <span className={`badge ${severityColors[article.severity]}`}>
                <FiAlertCircle className="w-3 h-3 mr-1" />
                {article.severity}
              </span>
              <span className="badge bg-blue-100 text-blue-800">
                📱 {article.application}
              </span>
              {article.errorCode && (
                <span className="badge bg-gray-100 text-gray-700 font-mono">
                  {article.errorCode}
                </span>
              )}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Link
              to={`/articles/${id}/edit`}
              className="btn-secondary flex items-center space-x-2"
            >
              <FiEdit className="w-4 h-4" />
              <span>Editar</span>
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center space-x-2"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Eliminar</span>
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FiUser className="w-4 h-4 mr-1" />
              {article.author}
            </span>
            <span className="flex items-center">
              <FiCalendar className="w-4 h-4 mr-1" />
              {format(new Date(article.createdAt), "dd 'de' MMMM, yyyy", { locale: es })}
            </span>
            {article.lastEditedBy && (
              <span className="flex items-center text-gray-500">
                <FiClock className="w-4 h-4 mr-1" />
                Editado por {article.lastEditedBy}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FiEye className="w-4 h-4 mr-1" />
              {article.views} vistas
            </span>
            <span className="flex items-center">
              <FiThumbsUp className="w-4 h-4 mr-1" />
              {article.helpful} útil
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="card">
        <div className="markdown-content prose max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>

      {/* Actions */}
      <div className="card bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              ¿Te resultó útil este artículo?
            </h3>
            <p className="text-sm text-gray-600">
              Tu retroalimentación ayuda a mejorar la base de conocimiento
            </p>
          </div>
          
          <button
            onClick={handleMarkHelpful}
            disabled={isHelpful}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isHelpful
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <FiThumbsUp className="w-5 h-5" />
            <span>{isHelpful ? '¡Marcado como útil!' : 'Sí, me ayudó'}</span>
          </button>
        </div>
      </div>

      {/* Version History Link */}
      {article.versions && article.versions.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiClock className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">
                Este artículo tiene {article.versions.length} versión{article.versions.length !== 1 ? 'es' : ''} anterior{article.versions.length !== 1 ? 'es' : ''}
              </span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Ver historial →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
