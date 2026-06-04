import { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import NewPlantForm from "./NewPlantForm";

const API_URL = "http://localhost:6001/plants";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Load plants on page load
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // Add new plant to state
  function handleAddPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  // Mark plant as sold out (PATCH + update state)
  function handleSoldOut(id) {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inStock: false }),
    })
      .then((res) => res.json())
      .then((updatedPlant) => {
        setPlants((prev) =>
          prev.map((plant) =>
            plant.id === id ? updatedPlant : plant
          )
        );
      });
  }

  // Filter plants by search
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <Header />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <PlantPage
        plants={displayedPlants}
        search={search}
        setSearch={setSearch}
        onSoldOut={handleSoldOut}
      />
    </div>
  );
}

export default App;