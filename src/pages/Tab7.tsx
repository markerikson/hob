import React, { useEffect, useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const Tab7: React.FC = () => {

  const styleMap = { "width": "100%", "height": "80vh" }
  
  const [lang, setLang] = useState(null)  
  useEffect(() => {
    fetch('http://161.97.167.92:1337/languages?tag=es_es')
      .then(res => res.json())
      .then(setLang)
  }, [])
  console.log(lang);

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
        url="https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png"
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