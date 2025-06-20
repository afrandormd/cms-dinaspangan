import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, LatLngTuple } from 'leaflet';
interface MapProps {
  posix: LatLngExpression | LatLngTuple,
  zoom?: number,
}

const defaults = {
  zoom: 19,
}
const Map = (Map: MapProps) => {
  const centerBandarLampung: LatLngExpression = [-5.402097, 105.266701];
  const zoomLevel = 12;
  const { zoom = defaults.zoom, posix } = Map

  return (
      <div className='w-full h-[400px]'>
        <MapContainer
          center={posix}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
      >
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={posix} draggable={false}>
              <Popup>Lokasi Disini</Popup>
          </Marker>
      </MapContainer>
      </div>
  )
};

export default Map;
