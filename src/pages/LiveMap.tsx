import * as MyConst from '../static/constants'

import React, { 
  useState,
  useEffect
} from 'react'

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'

import { RouteComponentProps } from 'react-router'

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import {
  MapContainer,
  TileLayer, 
  //Marker, Popup, GeoJSON, Polyline 
} from 'react-leaflet'

//import { Plugins } from '@capacitor/core'
import { useTranslation } from 'react-i18next'

// About leafLet
import 'leaflet/dist/leaflet.css'
//import { MyRoute } from '../models/MyRoute'
import L from 'leaflet';
//import { GeoJSON, Marker, Popup, useMapEvents } from 'react-leaflet';

//import { Plugins } from '@capacitor/core';

const styleMap = { 'width': '100%', 'height': '80vh' }  
//const { Geolocation } = Plugins

// Interfaces
//import { Content } from '../models/Content'
//import { RouteData } from '../models/RouteData'

export interface Route { 
  id: number,
  name: string,
  created_at: string,
  updated_at: string;
  data: {
    type: string;
    features: {
        type: string;
        properties: {
            "marker-color"?: undefined;
            "marker-size"?: undefined;
            "marker-symbol"?: undefined;
            "fill-opacity"?: undefined;
        };
        geometry: {
          type: string;
          coordinates:{
            lat: number;
            lng: number;
          }
      };
    }[];
  }
}

interface LocationError {
  showError: boolean;
  message?: string;
}

interface MapProps extends RouteComponentProps<{
  id: string;
}> {}

const LiveMap: React.FC<MapProps> =  ({match}) => {
  
  const { t } = useTranslation()
  /*
  const [error, setError] = useState<LocationError>({ showError: false });
  const [position, setPosition] = useState<Geoposition>();

  const getLocation = async () => {
    try {
        const position = await Geolocation.getCurrentPosition()
        console.log(position)
        setError({ showError: false })
        return position
    } catch (e) {
        setError({ showError: true, message: e.message })
    }
  }

  getLocation()
  */ 

  const [route, setRoute] = useState<Route>()
  useEffect(() => {
    fetch( MyConst.RestAPI + 'my-routes/'+match.params.id )
      .then(res => res.json())
      .then(setRoute)
  }, [match.params.id])

  console.log(route)

  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }

  /*
  L.geoJSON(someGeojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(map);
  
  const [activePoi, setActivePoi] = useState(null);

  var geoJsonLayer = L.geoJSON(route, {
    onEachFeature: function (feature, layer) {
      if (layer instanceof L.Polyline) {
        layer.setStyle({
          'color': feature.properties.color
        })
      }
    }
  })   
  */

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Route - Route title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MapContainer style={styleMap} center={[39.798052, 2.6952100]} zoom={14} scrollWheelZoom={false} >      
          <TileLayer /*onLoad={(e:any)=> { e.target._map.invalidateSize()}}*/
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/*my_route.map(poi => (
              <Polyline color={'red'} 
                position={poi.geometry.coordinates}*/
                /*onClick={() => {
                  setActivePoi(poi);
                }}
              />
            ))*/}
        </MapContainer>
      </IonContent>
    </IonPage>
  )

}

export default LiveMap