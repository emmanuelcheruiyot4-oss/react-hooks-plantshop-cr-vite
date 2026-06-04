function Search({ search, setSearch }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search plants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;