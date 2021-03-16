const axios = require("axios");
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/* 

Call this function in the user controllers for creating and modifying profiles in order to
convert the address string received from the front end into an object with the coordinates,
so that the coordinates may be stored in the database.

For example:
 
If "290 bremner blvd toronto" is passed in, { lat: 43.6426283, lng: -79.3868547 } will be returned

*/

const getCoordsFromAddress = async (address) => {
  const addressURIString = encodeURIComponent(address);
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURIString}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new Error("Could not find a location for that address");
    error.code(422);
    throw error;
  }

  const { lng, lat } = data.results[0].geometry.location;

  // Always list coordinates in longitude, latitude order.
  return [lng, lat];
};

module.exports = getCoordsFromAddress;
