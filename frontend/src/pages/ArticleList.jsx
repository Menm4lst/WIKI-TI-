import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';
import { articleAPI } from '../services/api';

export default function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    application: searchParams.get('application') || '',
    severity: searchParams.get('severity') || '',
    sort: searchParams.get('sort') || '-createdAt',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadArticles();
  }, [filters]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });
      
      const response = await articleAPI.getAll(params);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error cargando artículos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Actualizar URL
    const params = {};
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params[k] = newFilters[k];
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      application: '',
      severity: '',
      sort: '-createdAt',
    });
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Todos los Artículos</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary flex items-center space-x-2"
        >
          <FiFilter className="w-4 h-4" />
          <span>{showFilters ? 'Ocultar' : 'Mostrar'} Filtros</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                <option value="">Todas</option>
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
                Severidad
              </label>
              <select
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
                className="input-field"
              >
                <option value="">Todas</option>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="input-field"
              >
                <option value="-createdAt">Más recientes</option>
                <option value="createdAt">Más antiguos</option>
                <option value="-views">Más vistos</option>
                <option value="-helpful">Más útiles</option>
                <option value="title">Título A-Z</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full btn-secondary"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Cargando artículos...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 card">
          <p className="text-gray-600 text-lg">No se encontraron artículos</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600">
            Mostrando {articles.length} artículo{articles.length !== 1 ? 's' : ''}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
