import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';
import { searchAPI } from '../services/api';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    application: searchParams.get('application') || '',
    errorCode: searchParams.get('errorCode') || '',
    category: searchParams.get('category') || '',
    severity: searchParams.get('severity') || '',
    tags: searchParams.get('tags') || '',
  });

  const [applications, setApplications] = useState([]);
  const [errorCodes, setErrorCodes] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadOptions();
    if (searchParams.get('q') || Object.values(filters).some(v => v)) {
      handleSearch();
    }
  }, []);

  const loadOptions = async () => {
    try {
      const [appsRes, errorsRes, tagsRes] = await Promise.all([
        searchAPI.getApplications(),
        searchAPI.getErrorCodes(),
        searchAPI.getTags(),
      ]);
      
      setApplications(appsRes.data);
      setErrorCodes(errorsRes.data);
      setTags(tagsRes.data);
    } catch (error) {
      console.error('Error cargando opciones:', error);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      
      const params = {};
      if (searchQuery) params.q = searchQuery;
      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });

      const response = await searchAPI.search(params);
      setResults(response.data.results);
      
      // Actualizar URL
      setSearchParams(params);
    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      application: '',
      errorCode: '',
      category: '',
      severity: '',
      tags: '',
    });
    setResults([]);
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Búsqueda Avanzada</h1>
        <p className="text-gray-600">
          Encuentra artículos por aplicación, código de error, tags o texto completo
        </p>
      </div>

      {/* Search Bar */}
      <div className="card">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          placeholder="Buscar por título, contenido, aplicación, código de error..."
          showFilters={false}
        />
        
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiFilter className="w-4 h-4" />
            <span className="font-medium">
              {showFilters ? 'Ocultar' : 'Mostrar'} Filtros Avanzados
            </span>
          </button>

          {(searchQuery || Object.values(filters).some(v => v)) && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <FiX className="w-4 h-4" />
              <span className="font-medium">Limpiar Todo</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card space-y-4">
          <h3 className="font-semibold text-gray-900 mb-4">Filtros Avanzados</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aplicación
              </label>
              <select
                value={filters.application}
                onChange={(e) => handleFilterChange('application', e.target.value)}
                className="input-field"
              >
                <option value="">Todas las aplicaciones</option>
                {applications.map(app => (
                  <option key={app} value={app}>{app}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Error
              </label>
              <select
                value={filters.errorCode}
                onChange={(e) => handleFilterChange('errorCode', e.target.value)}
                className="input-field"
              >
                <option value="">Todos los códigos</option>
                {errorCodes.map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                <option value="">Todas las categorías</option>
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={filters.tags}
                onChange={(e) => handleFilterChange('tags', e.target.value)}
                placeholder="Ej: sap, oracle, error (separados por coma)"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={handleSearch}
              className="btn-primary flex items-center space-x-2"
            >
              <FiSearch className="w-4 h-4" />
              <span>Buscar con Filtros</span>
            </button>
          </div>
        </div>
      )}

      {/* Tags Populares */}
      {tags.length > 0 && !showFilters && (
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Tags Populares:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setFilters({ ...filters, tags: tag });
                  setTimeout(handleSearch, 100);
                }}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Buscando...</p>
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Se encontraron <span className="font-semibold text-gray-900">{results.length}</span> resultado{results.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </>
      ) : searchQuery || Object.values(filters).some(v => v) ? (
        <div className="text-center py-12 card">
          <p className="text-gray-600 text-lg mb-4">No se encontraron resultados</p>
          <button
            onClick={clearFilters}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div className="text-center py-12 card">
          <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            Utiliza la barra de búsqueda o los filtros para encontrar artículos
          </p>
        </div>
      )}
    </div>
  );
}
