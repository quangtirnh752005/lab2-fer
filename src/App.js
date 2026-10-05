import { useContext, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieDetail from "./components/MovieDetail.jsx";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { movies as initialMovies } from "./datas/movies";

function MovieManager() {
  const { darkMode } = useContext(ThemeContext);

  // Danh sách phim (tự lưu vào localStorage)
  const [movies, setMovies] = useLocalStorage("movies", initialMovies);

  // Bộ lọc thể loại: "all" hoặc tên thể loại
  const [genre, setGenre] = useState("all");

  // Từ khóa tìm kiếm
  const [search, setSearch] = useState("");

  // Sắp xếp theo rating: "none" | "desc" (cao → thấp) | "asc" (thấp → cao)
  const [sortRating, setSortRating] = useState("none");

  // Thêm / bỏ yêu thích
  const toggleFavorite = (id) => {
    const newMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, favorite: !movie.favorite } : movie,
    );

    setMovies(newMovies);
  };

  // Đếm số phim yêu thích
  const favoriteCount = useMemo(() => {
    return movies.filter((movie) => movie.favorite).length;
  }, [movies]);

  // Lấy danh sách thể loại (không trùng nhau) để đưa vào ô chọn
  const genres = useMemo(() => {
    const allGenres = movies.map((movie) => movie.genre);
    return [...new Set(allGenres)];
  }, [movies]);

  // Lọc danh sách theo thể loại, từ khóa rồi sắp xếp theo rating
  const filteredMovies = useMemo(() => {
    let result = movies;

    if (genre !== "all") {
      result = result.filter((movie) => movie.genre === genre);
    }

    result = result.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()),
    );

    // Dùng [...result] để tạo mảng mới, không làm thay đổi mảng gốc
    if (sortRating === "desc") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    if (sortRating === "asc") {
      result = [...result].sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [movies, genre, search, sortRating]);

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
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Header />

        <SearchBar
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          genres={genres}
          sortRating={sortRating}
          setSortRating={setSortRating}
        />

        {/* Thống kê */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #ccc" }}>
          Total: {movies.length} | Favorites: {favoriteCount} | Showing:{" "}
          {filteredMovies.length}
        </div>

        <MovieList
          movies={filteredMovies}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Trang chủ: danh sách phim */}
          <Route path="/" element={<MovieManager />} />

          {/* Trang chi tiết phim, ví dụ /movies/1 */}
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
