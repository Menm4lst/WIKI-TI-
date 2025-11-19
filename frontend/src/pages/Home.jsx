import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiBook, FiZap } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';
import { articleAPI, categoryAPI } from '../services/api';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [popularArticles, setPopularArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [popular, recent, stats] = await Promise.all([
        articleAPI.getPopular(5),
        articleAPI.getAll({ limit: 6, sort: '-createdAt' }),
        categoryAPI.getStats(),
      ]);
      
      setPopularArticles(popular.data);
      setRecentArticles(recent.data.articles);
      setCategoryStats(stats.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12 text-white shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Base de Conocimiento IT
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            Documenta, busca y comparte soluciones técnicas con tu equipo
          </p>
          
          <div className="bg-white rounded-lg p-2 shadow-xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar por aplicación, código de error, tags..."
              onSearch={handleSearch}
              showFilters={false}
            />
          </div>

          <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
            <Link to="/search?category=incidencia" className="hover:text-primary-200 transition-colors">
              🔴 Incidencias
            </Link>
            <Link to="/search?category=error" className="hover:text-primary-200 transition-colors">
              ⚠️ Errores
            </Link>
            <Link to="/search?category=solucion" className="hover:text-primary-200 transition-colors">
              ✅ Soluciones
            </Link>
            <Link to="/search?category=procedimiento" className="hover:text-primary-200 transition-colors">
              📋 Procedimientos
            </Link>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryStats.slice(0, 3).map((stat) => (
          <div key={stat._id} className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {stat.count}
            </div>
            <div className="text-gray-600 font-medium capitalize">
              {stat._id}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {stat.totalViews} visualizaciones
            </div>
          </div>
        ))}
      </div>

      {/* Artículos Populares */}
      {!loading && popularArticles.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FiTrendingUp className="w-6 h-6 mr-2 text-primary-600" />
              Artículos Más Vistos
            </h2>
            <Link to="/articles?sort=-views" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver todos →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Artículos Recientes */}
      {!loading && recentArticles.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FiZap className="w-6 h-6 mr-2 text-primary-600" />
              Artículos Recientes
            </h2>
            <Link to="/articles" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver todos →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Mensaje cuando no hay artículos */}
      {!loading && recentArticles.length === 0 && popularArticles.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¡Bienvenido a tu Wiki Técnica!
          </h3>
          <p className="text-gray-600 mb-6">
            Aún no hay artículos. Comienza documentando tu primer problema o solución.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            📝 Crear Primer Artículo
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <section className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FiBook className="w-5 h-5 mr-2 text-primary-600" />
          Acceso Rápido
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/create"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-medium text-gray-700">Nuevo Artículo</div>
          </Link>
          <Link
            to="/search"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
          >
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-medium text-gray-700">Búsqueda Avanzada</div>
          </Link>
          <Link
            to="/articles?category=error"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
          >
            <div className="text-2xl mb-2">⚠️</div>
            <div className="font-medium text-gray-700">Errores Comunes</div>
          </Link>
          <Link
            to="/articles?category=procedimiento"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium text-gray-700">Procedimientos</div>
          </Link>
        </div>
      </section>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      )}
    </div>
  );
}
