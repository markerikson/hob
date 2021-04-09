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

import {
  MapContainer, 
  TileLayer,
  Popup,
  Circle,
  Marker,
  Polygon,
  Polyline,
  CircleMarker,
  useMapEvents,
  //Rectangle,
  //GeoJSON,
} from 'react-leaflet'

import {
  //Plugins
} from '@capacitor/core'

import {
  useTranslation
} from 'react-i18next'

// About leafLet
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'

import { MyRoute } from '../models/MyRoute'
import { RouteData } from '../models/RouteData'
import { randomBytes } from 'crypto'

const styleMap = { 'width': '100%', 'height': '80vh' }
const fillBlueOptions = { fillColor: 'blue' }

interface MapProps extends RouteComponentProps<{
  id: string;
}> {}

const LiveMap: React.FC<MapProps> =  ({match}) => {
  
  const {t} = useTranslation()

  const [route, setRoute] = useState<MyRoute[]>([])
  useEffect(() => {
    fetch(MyConst.RestAPI + 'my-routes?id='+match.params.id)
      .then(res => res.json())
      .then(setRoute)
  }, [match.params.id])
  
  var lat = MyConst.main_center[0]
  var lng = MyConst.main_center[1]
  var zoom = MyConst.main_zoom
  var data = JSON.parse(JSON.stringify(MyConst.my_route))//sample test!! 
  
  if(typeof route[0] !== 'undefined'){

    lat = route[0].center_lat
    lng = route[0].center_long
    zoom = route[0].zoom
    data = route[0].data

  }else{
    console.log('Sin datos...')
  }

  function renderSwitch(type: string, coordinates: any) {

    switch(type) {
      
      case 'LineString':
        var polycoordinates = twistCoordinates(Object.values(coordinates))
        return <Polyline key={Math.random()} pathOptions={fillBlueOptions} positions={polycoordinates} />
      break
      case 'Point':
        return <Marker key={Math.random()} position={coordinates}></Marker>
      break
      default:
        return ''
    }

  }

  // Sadly, the GeoJSON comes twist from geojson.io. Then, I gonna twist  the content, So sorry u.u!!!
  function twistCoordinates(coordinates: any) {
    let result = []
    for(var i = 1; i< coordinates.length; i++){
      result.push([ coordinates[i][1], coordinates[i][0] ])
    }
    return result
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Route - Route title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MapContainer style={styleMap} center={[lat, lng]} zoom={zoom} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.features.map((r: RouteData) => (
            r.type === 'Feature'
              ? renderSwitch(r.geometry.type, r.geometry.coordinates)
              : '<div>Loading...</div>'
          ))}
        </MapContainer>
      </IonContent>
    </IonPage>
  )

}

export default LiveMap