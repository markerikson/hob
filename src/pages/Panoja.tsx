import * as MyConst from '../static/constants'
import React, { useState } from 'react'
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar
} from '@ionic/react'

import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const Panoja: React.FC = () => { 

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13
  });

  return(
    <IonPage>
      <IonHeader class='hob-header'>
        <IonToolbar class='hob-header'>   
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={(e:any) => setViewport(e)}
        mapboxApiAccessToken={MyConst.mapboxToken}
      />
      </IonContent>
    </IonPage>
  )
  
}

export default Panoja