import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon configuration
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// City and theater data
const cities = {
  Espoo: [
    { name: "Finnkino Iso Omena", lat: 60.1615, lng: 24.737 },
    { name: "Finnkino Sello", lat: 60.2181, lng: 24.81 },
  ],
  Helsinki: [
    { name: "Finnkino Itis", lat: 60.2061, lng: 25.0818 },
    { name: "Finnkino Kinopalatsi", lat: 60.1705, lng: 24.9426 },
    { name: "Finnkino Maxim", lat: 60.1666, lng: 24.9388 },
    { name: "Finnkino Tennispalatsi", lat: 60.1684, lng: 24.9309 },
  ],
  Vantaa: [{ name: "Finnkino Flamingo", lat: 60.2919, lng: 24.9721 }],
  Jyväskylä: [{ name: "Finnkino Fantasia", lat: 62.2426, lng: 25.7475 }],
  Kuopio: [{ name: "Finnkino Scala", lat: 62.8913, lng: 27.6788 }],
  Lahti: [{ name: "Finnkino Kuvapalatsi", lat: 60.9833, lng: 25.6591 }],
  Lappeenranta: [{ name: "Finnkino Strand", lat: 61.0582, lng: 28.1877 }],
  Oulu: [{ name: "Finnkino Plaza", lat: 65.0121, lng: 25.4682 }],
  Pori: [{ name: "Finnkino Promenadi", lat: 61.4847, lng: 21.7973 }],
  Tampere: [
    { name: "Finnkino Cine Atlas", lat: 61.4981, lng: 23.7602 },
    { name: "Finnkino Plevna", lat: 61.5009, lng: 23.7641 },
  ],
  Turku: [{ name: "Finnkino Kinopalatsi", lat: 60.4507, lng: 22.2687 }],
  Raisio: [{ name: "Finnkino Luxe Mylly", lat: 60.4824, lng: 22.1407 }],
};

// Dynamically adjust the map to fit all markers
const DynamicMapCenter = ({
  theaters,
}: {
  theaters: { lat: number; lng: number }[];
}) => {
  const map = useMap();
  if (theaters.length > 0) {
    const bounds = theaters.map(({ lat, lng }) => [lat, lng]);
    map.fitBounds(bounds);
  }
  return null;
};

export default function ShowtimeCard() {
  const [selectedCity, setSelectedCity] = useState("Helsinki");
  const theatersInCity = cities[selectedCity] || [];

  return (
    <div className="p-4">
      {/* Dropdown to select city */}
      <div className="mb-4">
        <label htmlFor="city-select" className="text-white font-bold mr-2">
          Select City:
        </label>
        <select
          id="city-select"
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
          className="bg-gray-800 text-white px-4 rounded"
        >
          {Object.keys(cities).map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
      </div>

      {/* Map and theater markers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all duration-300"
      >
        <div className="w-full h-96">
          <MapContainer
            center={[60.1699, 24.9384]} // Default center (Helsinki)
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <DynamicMapCenter theaters={theatersInCity} />
            {theatersInCity.map((theater, index) => (
              <Marker key={index} position={[theater.lat, theater.lng]}>
                <Popup>{theater.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </motion.div>
    </div>
  );
}
