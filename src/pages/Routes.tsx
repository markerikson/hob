import * as MyConst from '../static/constants'
import React, { useState, useEffect  } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

// About leafLet
import L from 'leaflet'
import { MapContainer, TileLayer, Popup, Marker, Polygon, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Models for the route
import { MyRoute } from '../models/MyRoute'
import { RouteData } from '../models/RouteData'

// Custom Map Markers
import markerEndIconSvg from '../static/icons/end-marker.svg'
import markerStartIconSvg from '../static/icons/start-marker.svg'
import markerCameraIconSvg from '../static/icons/camera-marker.svg'
//------------------------------------------------------------------
const endIcon = new L.Icon({ iconUrl: markerEndIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const startIcon = new L.Icon({ iconUrl: markerStartIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const cameraIcon = new L.Icon({ iconUrl: markerCameraIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})

interface MapProps extends RouteComponentProps<{
  id: string;
}> {}

const Routes: React.FC<MapProps> = ({match}) => {
  
  const {t} = useTranslation()

  // Default route data
  var name = MyConst.labels.routeName
  var description = JSON.parse(JSON.stringify(MyConst.my_route)) //sample test!! 
  var lat = MyConst.main_center[0]
  var lng = MyConst.main_center[1]
  var zoom = MyConst.main_zoom
  var data = JSON.parse(JSON.stringify(MyConst.my_route)) //sample test!!

  // Route initial data
  var start = [MyConst.main_center[0], MyConst.main_center[1]]
  var end   = [MyConst.main_center[0], MyConst.main_center[1]]

  const [routes, setRoutes] = useState<MyRoute[]>([])
  useEffect(() => {
    fetch(MyConst.RestAPI + 'my-routes?created_by='+match.params.id)
      .then(res => res.json())
      .then(setRoutes)
  }, [match.params.id])

  // Sadly, the GeoJSON comes twist from geojson.io. Then, I gonna twist  the content, So sorry u.u!!!
  function twistCoordinates(coordinates: any) {
    let result = []
    for(var i = 0; i < coordinates.length; i++){
      result.push([ coordinates[i][1], coordinates[i][0] ])
    }
    return result
  }

  function setMapContent(r: any) {
    switch(r.geometry.type) {
      case 'Point':
        return setMarker(r.geometry.coordinates[1], r.geometry.coordinates[0], cameraIcon, null)

      case 'Polygon':
        return setPolygon(r)

      case 'LineString':
        return setPolyLine(r)
        
      default:
        if(MyConst.JustTesting){
          console.log(MyConst.messages.unavailable.replace('#type#',r.geometry.type))
        }
    }
  }

  function setPolygon(r: any){
    var polygon = twistCoordinates(Object.values(r.geometry.coordinates[0]))
    return <Polygon
      key={Math.random()} 
      positions={[polygon]} 
      //pathOptions={MyConst.style.polygon}
    />
  }

  function setPolyLine(r: any){
    var polyLine = twistCoordinates(Object.values(r.geometry.coordinates))
    start = r.geometry.coordinates[0]
    end = r.geometry.coordinates[r.geometry.coordinates.length - 1]
    return <Polyline
      key={Math.random()}
      positions={polyLine}
      //pathOptions={MyConst.style.polyLine}
    />
  }

  function setMarker(lat:number, long:number, icon: any, popContent:any){
    return (
      <Marker
        key={Math.random()}
        position={[lat, long]}
        icon={icon}
      >{ popContent ? <Popup>{popContent}</Popup> : '' }        
      </Marker>      
    )
  }

  function renderRoutesList(routes: MyRoute[]) {
    return routes.map((r: MyRoute, index) => (
      <IonItem key={index}>
        <IonLabel>{t(r.name)}</IonLabel>
      </IonItem>
    ))
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
          key='mainMap' 
          style={MyConst.style.map}
          center={[start[0], start[1]]}
          zoom={zoom} scrollWheelZoom={false}
        >

          <TileLayer
            attribution={MyConst.mapAttribution}
            url={MyConst.tileUrl}
          />

          {/* Loading map features */}
          {data.features.map((r: RouteData) => (
            r.type === 'Feature'
              ? setMapContent(r)
              : t(MyConst.messages.loading)
          ))}

          {/* Loading route start 
          <Marker
            key='startMarker'
            position={[start[1], start[0]]}
            icon={startIcon}
          ><Popup>{MyConst.messages.routeStart}</Popup>
          </Marker>*/}

          {/* Loading route end 
          <Marker
            key='endMarker'
            position={[end[1], end[0]]}
            icon={endIcon}
          ><Popup>{MyConst.messages.routeEnd}</Popup>
          </Marker>*/}

        </MapContainer>
        {renderRoutesList(routes)}
      </IonContent>
    </IonPage>
  )

}

export default Routes