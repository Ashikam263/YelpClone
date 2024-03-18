import React, { useState, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { Dropdown } from "react-bootstrap";

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
      setName("");
      setLocation("");
      setPriceRange("Price Range");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
        <div className="input-group flex-nowrap mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Name" 
            aria-label="Name" 
            aria-describedby="name-addon"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

          <div className="input-group flex-nowrap mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Location" 
              aria-label="Location" 
              aria-describedby="location-addon"
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
            />
          </div>

          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="light" id="dropdown-basic" placeholder='Price Range'>
              {priceRange}
            </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setPriceRange("1")}>$</Dropdown.Item>
                <Dropdown.Item onClick={() => setPriceRange("2")}>$$</Dropdown.Item>
                <Dropdown.Item onClick={() => setPriceRange("3")}>$$$</Dropdown.Item>
                <Dropdown.Item onClick={() => setPriceRange("4")}>$$$$</Dropdown.Item>
                <Dropdown.Item onClick={() => setPriceRange("5")}>$$$$$</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-secondary w-100"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;