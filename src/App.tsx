import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SearchPage from './pages/SearchPage';
import WishListPage from './pages/WishListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchPage />} />
        <Route path="wishlist" element={<WishListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
