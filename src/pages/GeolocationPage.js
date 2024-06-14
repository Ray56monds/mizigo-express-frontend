import { Box, Button, TextField, Typography } from "@mui/material";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: -1.2921,
  lng: 36.8219,
};

const GeolocationPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleMarkerClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setSelectedLocation({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        });
      } else {
        alert("Address not found.");
      }
    } catch (error) {
      console.error(error);
      alert("Error searching for address.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      navigate("/create-order", {
        state: {
          location: selectedLocation,
        },
      });
    } else {
      alert("Please select a location on the map.");
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Select Delivery Location
      </Typography>
      <TextField
        label="Enter Address"
        value={address}
        onChange={handleAddressChange}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSearch} disabled={isLoading}>
        Search
      </Button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onClick={handleMarkerClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
        {selectedLocation && (
          <InfoWindow position={selectedLocation}>
            <div>Selected Location</div>
          </InfoWindow>
        )}
      </GoogleMap>
      <Button variant="contained" onClick={handleConfirm} sx={{ marginTop: 2 }}>
        Confirm
      </Button>
    </Box>
  );
};

export default GeolocationPage;