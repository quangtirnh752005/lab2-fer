import { useNavigate } from "react-router-dom";

// Hiển thị 1 bộ phim
function MovieItem({ movie, toggleFavorite }) {
  // Dùng để chuyển sang trang chi tiết
  const navigate = useNavigate();

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span style={{ flex: 1 }}>
        {movie.title} - {movie.genre} - {movie.year} - {movie.rating}
      </span>

      <button onClick={() => toggleFavorite(movie.id)} style={{ padding: "6px 12px" }}>
        {movie.favorite ? "Unfavorite" : "Favorite"}
      </button>

      <button onClick={() => navigate(`/movies/${movie.id}`)} style={{ padding: "6px 12px" }}>
        View Details
      </button>
    </li>
  );
}

export default MovieItem;
