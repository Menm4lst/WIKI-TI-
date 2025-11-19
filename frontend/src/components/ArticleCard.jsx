import { Link } from 'react-router-dom';
import { FiCalendar, FiEye, FiThumbsUp, FiAlertCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

export default function ArticleCard({ article }) {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <Link 
          to={`/articles/${article._id}`}
          className="flex-1"
        >
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
            {article.title}
          </h3>
        </Link>
        
        <span className={`badge ${severityColors[article.severity]} ml-2`}>
          <FiAlertCircle className="w-3 h-3 mr-1" />
          {article.severity}
        </span>
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <span className={`badge ${categoryColors[article.category]}`}>
          {article.category}
        </span>
        <span className="text-sm text-gray-600 font-medium">
          {article.application}
        </span>
        {article.errorCode && (
          <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded">
            {article.errorCode}
          </span>
        )}
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {article.tags.slice(0, 5).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <FiCalendar className="w-4 h-4 mr-1" />
            {format(new Date(article.createdAt), 'dd MMM yyyy', { locale: es })}
          </span>
          <span className="flex items-center">
            <FiEye className="w-4 h-4 mr-1" />
            {article.views}
          </span>
          <span className="flex items-center">
            <FiThumbsUp className="w-4 h-4 mr-1" />
            {article.helpful}
          </span>
        </div>
        
        <span className="text-xs text-gray-400">
          Por: {article.author}
        </span>
      </div>
    </div>
  );
}
