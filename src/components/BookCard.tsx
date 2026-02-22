import { useState } from 'react';
import { BookPlus, Trash2 } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import BookModal from './BookModal';
import type { Book } from '../types';

const FALLBACK_THUMBNAIL = 'https://via.placeholder.com/128x192?text=No+Cover';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { wishlist, addBook, removeBook } = useBooks();
  const isAdded = wishlist.some((b) => b.id === book.id);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <button
          onClick={() => setModalOpen(true)}
          className="h-48 bg-gray-100 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label={`View details for ${book.title}`}
        >
          <img
            src={book.thumbnail || FALLBACK_THUMBNAIL}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_THUMBNAIL;
            }}
          />
        </button>

        <div className="flex flex-col flex-1 px-4 pt-4 pb-2 gap-1.5">
          <button
            onClick={() => setModalOpen(true)}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
          >
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
              {book.title}
            </h3>
          </button>
          <p className="text-xs text-gray-400 line-clamp-1">
            {book.authors.length > 0 ? book.authors.join(', ') : 'Unknown author'}
          </p>
        </div>

        <div className="px-4 pb-4 pt-2">
          {isAdded ? (
            <button
              onClick={() => removeBook(book.id)}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-medium py-2 px-3 rounded-lg transition-colors bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 active:bg-red-200"
            >
              <Trash2 size={14} />
              Remove from Wishlist
            </button>
          ) : (
            <button
              onClick={() => addBook(book)}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-medium py-2 px-3 rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
            >
              <BookPlus size={14} />
              Add to Wishlist
            </button>
          )}
        </div>
      </div>

      {modalOpen && <BookModal book={book} onClose={() => setModalOpen(false)} />}
    </>
  );
}
