import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, BookPlus, Trash2, CalendarDays, BookOpen, Building2, Tag, ExternalLink } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import type { Book } from '../types';

const FALLBACK_THUMBNAIL = 'https://via.placeholder.com/128x192?text=No+Cover';

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

export default function BookModal({ book, onClose }: BookModalProps) {
  const { wishlist, addBook, removeBook } = useBooks();
  const isAdded = wishlist.some((b) => b.id === book.id);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === backdropRef.current) onClose();
  }

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
        >
          <X size={18} />
        </button>

        <div className="flex gap-4 p-5 border-b border-gray-100">
          <img
            src={book.thumbnail || FALLBACK_THUMBNAIL}
            alt={book.title}
            className="w-24 h-36 object-cover rounded-lg shadow-md flex-shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_THUMBNAIL;
            }}
          />
          <div className="flex flex-col justify-between min-w-0">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-gray-900 leading-snug line-clamp-3">
                {book.title}
              </h2>
              <p className="text-sm text-gray-500">
                {book.authors.length > 0 ? book.authors.join(', ') : 'Unknown author'}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {book.publishedDate && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <CalendarDays size={12} />
                  {book.publishedDate}
                </span>
              )}
              {book.pageCount && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <BookOpen size={12} />
                  {book.pageCount} pages
                </span>
              )}
              {book.publisher && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Building2 size={12} />
                  {book.publisher}
                </span>
              )}
            </div>

            {book.categories && book.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {book.categories.slice(0, 3).map((cat) => (
                  <span
                    key={cat}
                    className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full"
                  >
                    <Tag size={10} />
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {book.description && (
          <div className="overflow-y-auto px-5 py-4 flex-1">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{book.description}</p>
          </div>
        )}

        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
          {isAdded ? (
            <button
              onClick={() => { removeBook(book.id); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2.5 px-4 rounded-xl transition-colors bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 active:bg-red-200"
            >
              <Trash2 size={15} />
              Remove from Wishlist
            </button>
          ) : (
            <button
              onClick={() => { addBook(book); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2.5 px-4 rounded-xl transition-colors bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
            >
              <BookPlus size={15} />
              Add to Wishlist
            </button>
          )}

          {book.previewLink && (
            <a
              href={book.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-medium py-2.5 px-4 rounded-xl transition-colors bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100"
            >
              <ExternalLink size={15} />
              Read Preview
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
