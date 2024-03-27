// import React, { useState, useContext, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Changed import
// import { RestaurantsContext } from "../context/RestaurantsContext";
// import RestaurantFinder from "../apis/RestaurantFinder";

// const UpdateRestaurant = (props) => {
//   const { id } = useParams();
//   const navigate = useNavigate(); // Changed declaration
//   const { restaurants } = useContext(RestaurantsContext);
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [priceRange, setPriceRange] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await RestaurantFinder.get(`/${id}`);
//       console.log(response.data.data);
//       setName(response.data.data.restaurant.name);
//       setLocation(response.data.data.restaurant.location);
//       setPriceRange(response.data.data.restaurant.price_range);
//     };

//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
//       name,
//       location,
//       price_range: priceRange,
//     });
//     navigate("/"); // Changed navigation
//   };

//   return (
//     <div>
//       <form action="">
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             id="name"
//             className="form-control"
//             type="text"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="location">Location</label>
//           <input
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             id="location"
//             className="form-control"
//             type="text"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="price_range">Price Range</label>
//           <input
//             value={priceRange}
//             onChange={(e) => setPriceRange(e.target.value)}
//             id="price_range"
//             className="form-control"
//             type="number"
//           />
//         </div>
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className="btn btn-primary"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateRestaurant;

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants } = useContext(RestaurantsContext);
  
  // Fetch restaurant data only if it's not available
  useEffect(() => {
    const fetchData = async () => {
      if (!restaurants[id]) {
        try {
          const response = await RestaurantFinder.get(`/${id}`);
          const { name, location, price_range } = response.data.data.restaurant;
          setName(name);
          setLocation(location);
          setPriceRange(price_range);
        } catch (error) {
          console.error("Error fetching restaurant data:", error);
        }
      } else {
        const { name, location, price_range } = restaurants[id];
        setName(name);
        setLocation(location);
        setPriceRange(price_range);
      }
    };

    fetchData();
  }, [id, restaurants]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    priceRange: ""
  });

  const { name, location, priceRange } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestaurantFinder.put(`/${id}`, formData);
      navigate("/"); // Navigate after successful submission
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={handleChange}
            name="name"
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={handleChange}
            name="location"
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="priceRange">Price Range</label>
          <input
            value={priceRange}
            onChange={handleChange}
            name="priceRange"
            id="priceRange"
            className="form-control"
            type="number"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
