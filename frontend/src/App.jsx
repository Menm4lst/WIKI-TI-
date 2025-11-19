import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ArticleList from './pages/ArticleList';
import ArticleView from './pages/ArticleView';
import ArticleEdit from './pages/ArticleEdit';
import ArticleCreate from './pages/ArticleCreate';
import Search from './pages/Search';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleView />} />
        <Route path="/articles/:id/edit" element={<ArticleEdit />} />
        <Route path="/create" element={<ArticleCreate />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  );
}

export default App;
