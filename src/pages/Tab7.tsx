import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Tab7: React.FC = () => {
  const styleMap = { "width": "100%", "height": "80vh" }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Route - Route title</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <MapContainer style={styleMap} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default Tab7;