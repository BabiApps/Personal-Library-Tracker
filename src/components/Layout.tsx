import { NavLink, Outlet } from 'react-router-dom';
import { Search, BookMarked, Library } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2 mr-auto sm:mr-4">
            <Library size={20} className="text-blue-600 flex-shrink-0" />
            <span className="text-base sm:text-xl font-bold text-gray-800 whitespace-nowrap">
              Personal Library
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <Search size={15} />
              <span>Search</span>
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <BookMarked size={15} />
              <span>Wishlist</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Library size={13} className="text-blue-400" />
            <span className="font-medium text-gray-500">Personal Library</span>
          </div>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
          <span>Powered by Google Books API</span>
        </div>
      </footer>
    </div>
  );
}
