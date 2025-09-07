import React, { useState, useEffect } from "react";

// MovieHomePage.jsx
// Single-file React component for a modern movie homepage using Tailwind CSS.
// - Default export: MovieHomePage
// - Uses mock data; replace with real API calls (TMDB or your own) as needed.

const sampleMovies = [
  {
    id: 1,
    title: "The Midnight Voyager",
    year: 2024,
    rating: 8.3,
    runtime: "2h 10m",
    genres: ["Adventure", "Sci-Fi"],
    poster: "https://images.unsplash.com/photo-1517604931442-7a8f8f9a8b5b?w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1600&q=60",
    overview:
      "A group of explorers journey beyond the known galaxy and discover a secret that changes humanity's future.",
  },
  {
    id: 2,
    title: "Concrete Gardens",
    year: 2023,
    rating: 7.5,
    runtime: "1h 45m",
    genres: ["Drama"],
    poster: "https://images.unsplash.com/photo-1542204165-4d8a3a1b8b9d?w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1600&q=60",
    overview: "An intimate portrait of neighbors who build an unlikely friendship in an inner-city block.",
  },
  {
    id: 3,
    title: "Neon Breakers",
    year: 2025,
    rating: 8.9,
    runtime: "2h 5m",
    genres: ["Action", "Thriller"],
    poster: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=60",
    overview: "A heist film set in a glowing cyber-metropolis where trust is the most valuable currency.",
  },
  // add more movie objects as needed
];

function Header({ onSearch, onToggleMenu }) {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-extrabold tracking-tight">Cinewave</div>
        <nav className="hidden md:flex gap-4 text-slate-200">
          <button className="hover:text-white">Home</button>
          <button className="hover:text-white">Movies</button>
          <button className="hover:text-white">Genres</button>
          <button className="hover:text-white">My List</button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar onSearch={onSearch} />
        <button
          onClick={onToggleMenu}
          className="hidden md:inline-block bg-white/10 px-3 py-1 rounded-lg text-sm"
        >
          Sign in
        </button>
        <button className="md:hidden p-2 rounded bg-white/10" aria-label="menu">
          ☰
        </button>
      </div>
    </header>
  );
}

function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(q)}
        placeholder="Search movies, actors, genres..."
        className="w-56 md:w-80 rounded-full px-4 py-2 bg-white/10 placeholder-slate-300 text-sm outline-none"
      />
      <button
        onClick={() => onSearch(q)}
        className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-white/10 text-sm"
      >
        Search
      </button>
    </div>
  );
}

function MovieCard({ movie, onOpen }) {
  return (
    <div className="bg-slate-800/60 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-200">
      <div className="relative">
        <img src={movie.poster} alt={movie.title} className="w-full h-56 object-cover" />
        <div className="absolute bottom-2 left-2 bg-black/60 px-3 py-1 rounded text-xs">
          {movie.year} • {movie.runtime}
        </div>
        <div className="absolute top-2 right-2 bg-amber-400/95 px-2 py-1 rounded text-xs font-semibold text-slate-900">
          ★ {movie.rating}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
        <p className="text-sm text-slate-300 mt-1 line-clamp-2">{movie.overview}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-400">{movie.genres.join(", ")}</div>
          <button
            onClick={() => onOpen(movie)}
            className="text-sm bg-white/10 px-3 py-1 rounded-lg"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

function MovieModal({ movie, onClose }) {
  if (!movie) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-w-4xl w-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
        <div className="relative h-64">
          <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 bg-white/10 px-3 py-1 rounded-full"
          >
            ✕
          </button>
        </div>
        <div className="p-6 text-slate-100">
          <div className="flex gap-6">
            <img src={movie.poster} alt={movie.title} className="w-36 rounded" />
            <div>
              <h2 className="text-2xl font-bold">{movie.title} <span className="text-slate-400 text-sm">({movie.year})</span></h2>
              <div className="mt-2 text-slate-300">{movie.genres.join(" • ")} • {movie.runtime}</div>
              <p className="mt-4 text-slate-300">{movie.overview}</p>
              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 rounded bg-amber-400 text-slate-900 font-semibold">Play Trailer</button>
                <button className="px-4 py-2 rounded bg-white/10">Add to List</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MovieHomePage() {
  const [movies, setMovies] = useState(sampleMovies);
  const [query, setQuery] = useState("");
  const [activeMovie, setActiveMovie] = useState(null);
  const [activeGenre, setActiveGenre] = useState("All");

  useEffect(() => {
    // In production: fetch data from API (e.g., TMDB) here.
    // fetch('/api/movies').then(...)
  }, []);

  const genres = Array.from(new Set(movies.flatMap((m) => m.genres))).sort();

  function handleSearch(q) {
    setQuery(q || "");
    if (!q) return setMovies(sampleMovies);
    const lowered = q.toLowerCase();
    setMovies(
      sampleMovies.filter(
        (m) => m.title.toLowerCase().includes(lowered) || m.genres.join(" ").toLowerCase().includes(lowered)
      )
    );
  }

  function handleFilterGenre(g) {
    setActiveGenre(g);
    if (g === "All") return setMovies(sampleMovies);
    setMovies(sampleMovies.filter((m) => m.genres.includes(g)));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      <Header onSearch={handleSearch} onToggleMenu={() => {}} />

      {/* HERO */}
      <section className="relative mt-6 px-6">
        <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 relative">
            <img
              src={sampleMovies[0].backdrop}
              alt={sampleMovies[0].title}
              className="w-full h-96 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex items-end">
              <div>
                <h1 className="text-4xl font-extrabold">{sampleMovies[0].title}</h1>
                <p className="mt-2 text-slate-300 max-w-xl">{sampleMovies[0].overview}</p>
                <div className="mt-4 flex gap-3">
                  <button className="px-5 py-2 rounded bg-amber-400 text-slate-900 font-semibold">Play</button>
                  <button className="px-5 py-2 rounded bg-white/10">More Info</button>
                </div>
              </div>
            </div>
          </div>

          <aside className="p-4 bg-slate-900/50 rounded-2xl">
            <h3 className="text-lg font-semibold">Top Picks</h3>
            <div className="mt-4 space-y-3">
              {sampleMovies.slice(1, 4).map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <img src={m.poster} alt={m.title} className="w-14 h-20 object-cover rounded" />
                  <div>
                    <div className="font-semibold">{m.title}</div>
                    <div className="text-xs text-slate-400">{m.genres.join(", ")}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Filters & Movie Grid */}
      <main className="px-6 mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Discover</h2>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span>Genre:</span>
              <select
                value={activeGenre}
                onChange={(e) => handleFilterGenre(e.target.value)}
                className="bg-white/5 rounded px-3 py-1"
              >
                <option>All</option>
                {genres.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-slate-400">Showing {movies.length} results {query ? `for "${query}"` : ""}</div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} onOpen={setActiveMovie} />
          ))}
        </div>

        {/* Pagination (placeholder) */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-3 text-sm">
            <button className="px-3 py-1 rounded bg-white/5">Prev</button>
            <div className="px-3 py-1">1</div>
            <button className="px-3 py-1 rounded bg-white/5">Next</button>
          </div>
        </div>
      </main>

      <footer className="mt-12 p-6 text-center text-slate-400 text-sm">
        Built with ❤️ using React + Tailwind. Replace sample data with your API for production.
      </footer>

      <MovieModal movie={activeMovie} onClose={() => setActiveMovie(null)} />
    </div>
  );
}
