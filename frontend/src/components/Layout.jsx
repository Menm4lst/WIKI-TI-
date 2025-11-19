import { Link } from 'react-router-dom';
import { FiBook, FiSearch, FiPlus, FiHome } from 'react-icons/fi';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <FiBook className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Wiki Técnica</h1>
                <p className="text-xs text-gray-500">IT Knowledge Base</p>
              </div>
            </Link>

            <nav className="flex items-center space-x-1">
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiHome className="w-4 h-4" />
                <span className="font-medium">Inicio</span>
              </Link>
              <Link
                to="/articles"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiBook className="w-4 h-4" />
                <span className="font-medium">Artículos</span>
              </Link>
              <Link
                to="/search"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiSearch className="w-4 h-4" />
                <span className="font-medium">Buscar</span>
              </Link>
              <Link
                to="/create"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors ml-2"
              >
                <FiPlus className="w-4 h-4" />
                <span className="font-medium">Nuevo Artículo</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2025 Wiki Técnica - Sistema de Documentación IT</p>
            <p className="mt-1 text-xs text-gray-500">
              Desarrollado para técnicos por técnicos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
