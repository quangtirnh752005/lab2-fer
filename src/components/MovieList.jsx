import MovieItem from "./MovieItem.jsx";

// Hiển thị danh sách phim
function MovieList({ movies, toggleFavorite }) {
  // Không có phim nào thì báo cho người dùng
  if (movies.length === 0) {
    return <p style={{ textAlign: "center" }}>No movies found.</p>;
  }

  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </ul>
  );
}

export default MovieList;
