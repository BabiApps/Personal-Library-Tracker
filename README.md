# Personal Library

A responsive web app for discovering and saving books to a personal wishlist, powered by the Google Books API.

**🚀 [Live Demo: Play with the app here!](https://BabiApps.github.io/Personal-Library-Tracker/)**

## Features

- **Book Search** — Search for any book in real time with debounced input (500ms) to minimise API calls
- **Book Details Modal** — Click a book cover or title to open an extended details modal (description, published date, page count, publisher, categories)
- **Read Preview** — Direct link to Google Books preview, opens in a new tab
- **Wishlist** — Add or remove books from a personal wishlist with a single click
- **Persistent State** — Wishlist is saved to `localStorage` and restored on every visit
- **Responsive Design** — Fully responsive grid layout across mobile, tablet and desktop

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v7 |
| Icons | Lucide React |
| Data | Google Books API |
| State | React Context API + localStorage |

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx       # App shell: sticky navbar + footer
│   ├── BookCard.tsx     # Book thumbnail card with add/remove action
│   └── BookModal.tsx    # Extended details modal (portal)
├── context/
│   └── BookContext.tsx  # Wishlist state + localStorage persistence
├── hooks/
│   └── useDebounce.ts   # Generic debounce hook
├── pages/
│   ├── SearchPage.tsx   # Search interface + Google Books fetch
│   └── WishListPage.tsx # Saved books grid + empty state
└── types/
    └── index.ts         # Book interface
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

## Usage

1. Go to the **Search** page and type a book title, author or keyword
2. Click a book cover or title to view extended details
3. Click **Add to Wishlist** to save a book
4. Go to the **Wishlist** page to view your saved books
5. Click **Remove from Wishlist** to remove a book, or use the same button inside the modal
