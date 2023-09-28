import { useEffect, useRef, useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKeyPress } from "./useKeyPress";
import StarRating from "./StarRating";

const API_KEY = "d9a0d153";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [watched, setWatched] = useLocalStorageState("watched", []);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function HandleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    if (watched.some((m) => m.imdbID === movie.imdbID)) return;

    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatchedMovie(imdbID) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== imdbID));
  }

  function handleOnSelectedId(imdbId) {
    setSelectedId((currentId) => (currentId === imdbId ? null : imdbId));
  }

  const { movies, isLoading, error } = useMovies(query, HandleCloseMovie);

  return (
    <>
      <NavItem>
        <SearchBar query={query} onSearch={setQuery} />
        <NavBarResults movies={movies} />
      </NavItem>

      <Main>
        <Box>
          {error && <ErrorMessages error={error} />}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelected={handleOnSelectedId} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovieDetails
              selectedId={selectedId}
              onCloseMovie={() => setSelectedId(null)}
              onAddWatchedMovie={handleAddWatchedMovie}
              watchedMovies={watched}
            />
          ) : (
            <>
              <MoviesWachedSummary watchedMovies={watched} />
              <WatchedMoviesList
                watchedMovies={watched}
                onRemoveWatchedMovie={handleRemoveWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function NavItem({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar({ query, onSearch }) {
  const inputElement = useRef(null);

  useKeyPress("Enter", () => {
    if  (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    onSearch("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSearch(e.target.value)}
      ref={inputElement}
    />
  );
}

function Loader() {
  return <div className="loader">Loading...</div>;
}

function NavBarResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}

function ErrorMessages({ error }) {
  return <p className="error">⛔{error}</p>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelected }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem onSelected={onSelected} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function MovieItem({ movie, onSelected }) {
  return (
    <li onClick={() => onSelected(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watchedMovies, onRemoveWatchedMovie }) {
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <WatchedMovieItem
          movie={movie}
          onRemoveWatchedMovie={onRemoveWatchedMovie}
          key={movie.title}
        />
      ))}
    </ul>
  );
}

function WatchedMovieItem({ movie, onRemoveWatchedMovie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onRemoveWatchedMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function MoviesWachedSummary({ watchedMovies }) {
  const avgImdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedMovies.map((movie) => movie.userRating));
  const avgRuntime = average(watchedMovies.map((movie) => movie.runtime || 0));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}

function SelectedMovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
  watchedMovies,
}) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const ratingsCountRef = useRef(0);

  const watchedMovie = watchedMovies.find(
    (movie) => movie.imdbID === selectedId
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails || {};

  function handleAdd() {
    onAddWatchedMovie({
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating,
      runtime: Number(runtime.split(" ")[0]),
      userRating: rating,
    });
    onCloseMovie();
  }

  useEffect(
    function fetchMovieDetails() {
      async function fetchMovieDetailsAsync() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieDetails(data);
        setIsLoading(false);
      }

      if (selectedId) fetchMovieDetailsAsync();
    },
    [selectedId]
  );

  useEffect(
    function updatePageTitle() {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return () => {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useKeyPress("Escape", () => onCloseMovie(null));

  useEffect(() => {
    if (rating) ratingsCountRef.current += 1;
  }, [rating]);

  if (isLoading) return <Loader />;

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>

        <img src={poster} alt={`${title} poster`} />

        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDB rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating
            rating={watchedMovie ? watchedMovie.userRating : rating}
            totalStars={10}
            size={24}
            onRate={setRating}
            readonly={watchedMovie != null}
          />
          {rating > 0 && !watchedMovie && (
            <button className="btn-add" onClick={handleAdd}>
              + Add to list
            </button>
          )}
        </div>

        <h3>
          <em>{plot}</em>
        </h3>
        <p>Staring: {actors}</p>
        <p>Directed by: {director}</p>
      </section>
    </div>
  );
}
