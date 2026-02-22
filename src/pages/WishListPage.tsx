import { Link } from 'react-router-dom';
import { BookMarked, Search } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';

export default function WishListPage() {
  const { wishlist } = useBooks();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-gray-800">Wishlist</h1>
        {wishlist.length > 0 && (
          <span className="text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
            {wishlist.length} {wishlist.length === 1 ? 'book' : 'books'}
          </span>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <BookMarked size={48} strokeWidth={1.5} />
          <div className="text-center space-y-1">
            <p className="text-lg font-medium text-gray-500">Your wishlist is empty.</p>
            <p className="text-sm">Go find some books and save them here!</p>
          </div>
          <Link
            to="/"
            className="mt-2 flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            <Search size={15} />
            Search Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
