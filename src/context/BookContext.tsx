import { createContext, useContext, useEffect, useState } from 'react';
import type { Book } from '../types';

const STORAGE_KEY = 'wishlist';

interface BookContextValue {
  wishlist: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
}

const BookContext = createContext<BookContextValue | null>(null);

function loadFromStorage(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Book[]) : [];
  } catch {
    return [];
  }
}

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Book[]>(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  function addBook(book: Book) {
    setWishlist((prev) =>
      prev.some((b) => b.id === book.id) ? prev : [...prev, book]
    );
  }

  function removeBook(id: string) {
    setWishlist((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <BookContext.Provider value={{ wishlist, addBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks(): BookContextValue {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBooks must be used inside a BookProvider');
  return ctx;
}
