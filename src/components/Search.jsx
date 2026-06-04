function Search({ search, setSearch }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Type a name to search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;