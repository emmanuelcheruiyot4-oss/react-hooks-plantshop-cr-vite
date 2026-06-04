import { useState } from "react";

const API_URL = "http://localhost:6001/plants";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      ...formData,
      price: Number(formData.price),
      inStock: true,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((createdPlant) => {
        onAddPlant(createdPlant);

        setFormData({
          name: "",
          image: "",
          price: "",
        });
      });
  }

  return (
    <form className="new-plant-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Plant name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;