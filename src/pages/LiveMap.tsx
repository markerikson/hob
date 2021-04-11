import * as MyConst from '../static/constants'
import React, { useState, useEffect  } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

// About leafLet
import L from 'leaflet'
import { MapContainer, TileLayer, Popup, Marker, Polygon, Polyline,
  //Circle, CircleMarker, useMapEvents 
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
//import 'leaflet/dist/leaflet.js'

// Models for the route
import { MyRoute } from '../models/MyRoute'
import { RouteData } from '../models/RouteData'

import { camera } from 'ionicons/icons'

const customMarkerIcon = new L.DivIcon({
  html: "<IonImg src='/assets/images/arrow-left.svg' slot='start'></IonImg>"
})

interface MapProps extends RouteComponentProps<{
  id: string;
}> {}

const LiveMap: React.FC<MapProps> = ({match}) => {
  
  const {t} = useTranslation()

  // Default route data
  var name = MyConst.labels.routeName
  var description = JSON.parse(JSON.stringify(MyConst.my_route))//sample test!! 
  var lat = MyConst.main_center[0]
  var lng = MyConst.main_center[1]
  var zoom = MyConst.main_zoom
  var data = JSON.parse(JSON.stringify(MyConst.my_route))//sample test!!

  const [route, setRoute] = useState<MyRoute[]>([])
  useEffect(() => {
    fetch(MyConst.RestAPI + 'my-routes?id='+match.params.id)
      .then(res => res.json())
      .then(setRoute)
  }, [match.params.id])

  if(typeof route[0] !== 'undefined'){

    name = route[0].name
    description = JSON.parse(JSON.stringify(route[0].description))
    lat = route[0].center_lat
    lng = route[0].center_long
    zoom = route[0].zoom
    data = route[0].data

  }else{
    if(MyConst.JustTesting) console.log(MyConst.messages.noData)
  }

  // Sadly, the GeoJSON comes twist from geojson.io. Then, I gonna twist  the content, So sorry u.u!!!
  function twistCoordinates(coordinates: any) {
    let result = []
    for(var i = 0; i < coordinates.length; i++){
      result.push([ coordinates[i][1], coordinates[i][0] ])
    }
    return result
  }

  function setMapContent(type: string, coordinates: any) {

    switch(type) {      
      
      case 'Point':
        return (
          <Marker
            key={Math.random()}
            position={[coordinates[1], coordinates[0]]}
            icon={customMarkerIcon}
          >
            <Popup>
              WIP pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>      
        )
        
      case 'Polygon':
        var polygon = twistCoordinates(Object.values(coordinates))
        return <Polygon key={Math.random()} positions={polygon[0]}/>
          
      case 'LineString':
        var polyLine = twistCoordinates(Object.values(coordinates))
        return <Polyline key={Math.random()} pathOptions={MyConst.fillBlueOptions} positions={polyLine}/>

      default:
        if(MyConst.JustTesting) console.log(MyConst.messages.unavailable.replace('#type#', type))

    }

  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        {/* Loading map */}
        <MapContainer
          style={MyConst.styleMap}
          center={[lat, lng]}
          zoom={zoom} scrollWheelZoom={false}
        >

          <TileLayer
            attribution={MyConst.mapAttribution}
            url={MyConst.tileUrl}
          />

          {/* Loading map features */}
          {data.features.map((r: RouteData) => (
            r.type === 'Feature'
              ? setMapContent(r.geometry.type, r.geometry.coordinates)
              : t(MyConst.messages.loading)
          ))}

        </MapContainer>
      </IonContent>
    </IonPage>
  )

}

export default LiveMap