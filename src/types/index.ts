export interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  publisher?: string;
  previewLink?: string;
}
