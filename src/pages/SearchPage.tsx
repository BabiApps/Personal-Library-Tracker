import { useEffect, useState } from 'react';
import { Loader2, SearchX } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import BookCard from '../components/BookCard';
import type { Book } from '../types';

interface GoogleBooksItem {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    publisher?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    previewLink?: string;
  };
}

function mapToBook(item: GoogleBooksItem): Book {
  const v = item.volumeInfo;
  return {
    id: item.id,
    title: v.title ?? 'Untitled',
    authors: v.authors ?? [],
    thumbnail: v.imageLinks?.thumbnail?.replace('http://', 'https://') ?? '',
    description: v.description,
    publishedDate: v.publishedDate,
    pageCount: v.pageCount,
    categories: v.categories,
    publisher: v.publisher,
    previewLink: v.previewLink,
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const debouncedQuery = useDebounce(query.trim(), 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setBooks([]);
      setSearched(false);
      return;
    }

    const controller = new AbortController();

    async function fetchBooks() {
      setLoading(true);
      setError('');
      setSearched(true);

      try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(debouncedQuery)}&maxResults=20`;
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const data = await res.json();
        const items: GoogleBooksItem[] = data.items ?? [];
        setBooks(items.map(mapToBook));
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Something went wrong. Please try again.');
          setBooks([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Search Books</h1>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author or keyword..."
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        />
        {loading && (
          <Loader2
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 animate-spin"
          />
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {!loading && searched && books.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
          <SearchX size={40} />
          <p className="text-sm">No results found for &ldquo;{debouncedQuery}&rdquo;</p>
        </div>
      )}

      {books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
