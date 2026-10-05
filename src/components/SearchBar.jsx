// Ô tìm kiếm + bộ lọc + sắp xếp
function SearchBar({
  search,
  setSearch,
  genre,
  setGenre,
  genres,
  sortRating,
  setSortRating,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding: "16px 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      {/* Lọc theo thể loại */}
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="all">All genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* Sắp xếp theo rating */}
      <select value={sortRating} onChange={(e) => setSortRating(e.target.value)}>
        <option value="none">Default</option>
        <option value="desc">Rating: High → Low</option>
        <option value="asc">Rating: Low → High</option>
      </select>

      <input
        type="text"
        value={search}
        placeholder="Search by title..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
      />
    </div>
  );
}

export default SearchBar;
