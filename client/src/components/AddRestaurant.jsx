import React, { useState, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      console.log(response.data.data);
      addRestaurants(response.data.data.restaurant);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              type="text"
              placeholder="location"
            />
          </div>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="priceRangeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Price Range
            </button>
            <ul className="dropdown-menu" aria-labelledby="priceRangeDropdown">
              <li><button className="dropdown-item" type="button" onClick={() => setPriceRange("1")}>$</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => setPriceRange("2")}>$$</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => setPriceRange("3")}>$$$</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => setPriceRange("4")}>$$$$</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => setPriceRange("5")}>$$$$$</button></li>
            </ul>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;