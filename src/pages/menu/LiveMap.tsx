import * as MyConst from '../../services/constants'

import React, { useEffect, useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Plugins } from '@capacitor/core';

// get the users current position
//const position = await Geolocation.getCurrentPosition();

// grab latitude & longitude
//const latitude = position.coords.latitude;
//const longitude = position.coords.longitude;

const LiveMap: React.FC = () => {

  const styleMap = { 'width': '100%', 'height': '80vh' }  

  const [lang, setLang] = useState(null)
  useEffect(() => {
    fetch(MyConst.RestAPI+'languages?tag='+MyConst.RestAPI)
      .then(res => res.json())
      .then(setLang)
  }, [])
  console.log(lang)

  const [route, setRoute] = useState(null)
  useEffect(() => {
    fetch(MyConst.RestAPI+'map-routes?id=1')
      .then(res => res.json())
      .then(setRoute)
  }, [])
  console.log(route)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Route - Route title</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <MapContainer style={styleMap} center={[39.798052, 2.6952100]} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {/*<Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>*/}
      </MapContainer>
      </IonContent>
    </IonPage>
  );

};

export default LiveMap;