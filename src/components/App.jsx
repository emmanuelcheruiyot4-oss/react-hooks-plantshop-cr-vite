import { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import NewPlantForm from "./NewPlantForm";

const API_URL = "http://localhost:6001/plants";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);


  function handleAddPlant(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }

 
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
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? updatedPlant : plant
          )
        );
      });
  }

  
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <Header />

      {/* Add plant form */}
      <NewPlantForm onAddPlant={handleAddPlant} />

      {/* Main page (search + list) */}
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