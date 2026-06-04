function PlantCard({ plant, onSoldOut }) {
  const { id, name, image, price, inStock } = plant;

  function handleClick() {
    if (inStock) onSoldOut(id);
  }

  return (
    <li data-testid="plant-item" className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>

      <button
        onClick={handleClick}
        disabled={!inStock}
        className={inStock ? "primary" : "secondary"}
      >
        {inStock ? "In Stock" : "Sold Out"}
      </button>
    </li>
  );
}

export default PlantCard;