import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '../../types/ParkingSpot.type.ts';
import greenMarkerIcon from '../../assets/icons/green-marker-icon.png';
import redMarkerIcon from '../../assets/icons/red-marker-icon.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useAppContext } from '../../context/AppContext.tsx';
import { useLocationHook } from '../../hooks/LocationHooks.tsx';
import ReservationBox from '../ReservationForm/ReservationForm.tsx';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ParkingMapProps {
  parkingSpots: ParkingSpot[] | null;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ parkingSpots }) => {
  const { preciseLocation, approximateLocation } = useAppContext();
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const { getPreciseLocation, getApproximateLocation } = useLocationHook();

  useEffect(() => {
    getApproximateLocation();
    getPreciseLocation();
  }, [])

  const SetMap = () => {
    const map = useMap();
    useEffect(() => {
      if (approximateLocation !== null && preciseLocation !== null) {
        setTimeout(() => { map.setView([preciseLocation.latitude, preciseLocation.longitude], 13) }, 0)
      }
      else if (preciseLocation !== null) {
        setTimeout(() => { map.setView([preciseLocation.latitude, preciseLocation.longitude], 13) }, 0)
      } else if (approximateLocation !== null) {
        setTimeout(() => { map.setView([approximateLocation.latitude, approximateLocation.longitude], 5) }, 0)
      }
    }, [preciseLocation])
    return null;
  }

  const closeReservationModal = () => {
    setSelectedSpot(null);
  }
  return (
    <>
    <MapContainer center={(approximateLocation !== null) ? [approximateLocation.latitude, approximateLocation.longitude] : [0, 0]} zoom={5} scrollWheelZoom={true} style={{ height: '90vh', width: "100%", transition: "1s" }}>
      <SetMap />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {(preciseLocation !== null) && <Marker key={"Current_location"} position={[preciseLocation.latitude, preciseLocation.longitude]}>
        <Popup>
          <div>Your Location</div>
        </Popup>
      </Marker>}
      {parkingSpots && parkingSpots.map((spot) => {
        const availableIcon = new L.Icon({
          iconUrl: greenMarkerIcon, // Use a green icon for available
          iconSize: [20, 30],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        const occupiedIcon = new L.Icon({
          iconUrl: redMarkerIcon, // Use a red icon for occupied
          iconSize: [20, 30],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        return (
            <Marker
              key={spot._id}
              position={[spot.location.coordinates[1], spot.location.coordinates[0]]}
              eventHandlers={{}}
              icon={spot.status === 'available' ? availableIcon : occupiedIcon}
            >
              <Popup>
                <div className='spot_popup'>
                  <div className="spotInfo">
                    <h4>Spot #{spot.spotNumber}</h4>
                    <p>Status: {spot.status}</p>
                  </div>
                  {spot.status == 'available' && <div className="spotAction"><button className='btn' onClick={() => { setSelectedSpot(spot) }} >Book</button></div>}
                </div>
              </Popup>

            </Marker>);
      })}
      { selectedSpot && <ReservationBox selectedSpot={selectedSpot} closeModal={closeReservationModal} />}
          </MapContainer >
    </>
  );
};

export default ParkingMap;
