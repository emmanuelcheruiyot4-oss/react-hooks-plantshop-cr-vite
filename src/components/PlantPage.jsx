import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ plants, search, setSearch, onSoldOut }) {
  return (
    <main>
      <Search search={search} setSearch={setSearch} />
      <PlantList plants={plants} onSoldOut={onSoldOut} />
    </main>
  );
}

export default PlantPage;