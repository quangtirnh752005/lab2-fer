import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ThemeContext } from "../context/ThemeContext";
import { movies } from "../datas/movies";

// Trang chi tiết 1 bộ phim (đường dẫn: /movies/:id)
function MovieDetail() {
  const { darkMode } = useContext(ThemeContext);

  // Lấy id trên đường dẫn, ví dụ /movies/3 thì id = "3"
  const { id } = useParams();

  // Dùng để chuyển trang
  const navigate = useNavigate();

  // Tìm phim có id trùng (id trên đường dẫn là chuỗi nên đổi sang số)
  const movie = movies.find((m) => m.id === Number(id));

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 16px",
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "white" : "black",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Movie Details</h2>

        {!movie && <p>Movie not found.</p>}

        {movie && (
          <div style={{ lineHeight: "1.8" }}>
            <div>Title: {movie.title}</div>
            <div>Genre: {movie.genre}</div>
            <div>Year: {movie.year}</div>
            <div>Rating: {movie.rating}</div>
            <div>Director: {movie.director}</div>
            <div>Duration: {movie.duration} minutes</div>
            <div>Description: {movie.description}</div>
          </div>
        )}

        <button onClick={() => navigate("/")} style={{ marginTop: "16px", padding: "8px 16px" }}>
          Close
        </button>
      </div>
    </div>
  );
}

export default MovieDetail;
