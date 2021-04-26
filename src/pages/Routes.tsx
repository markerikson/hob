import * as MyConst from '../static/constants'
import React, { useState, useEffect  } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from 'jquery'

// About leafLet
import L from 'leaflet'
import { MapContainer, TileLayer, Polyline, Popup, Marker, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Models for the route
import { Menu } from '../models/Menu'
import { MyRoute } from '../models/MyRoute'
//import { RouteData } from '../models/RouteData'

// Custom Map Markers
//import markerEndIconSvg from '../static/icons/end-marker.svg'
import markerStartIconSvg from '../static/icons/start-marker.svg'
import markerCameraIconSvg from '../static/icons/camera-marker.svg'
//------------------------------------------------------------------
//const endIcon = new L.Icon({ iconUrl: markerEndIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const startIcon = new L.Icon({ iconUrl: markerStartIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const cameraIcon = new L.Icon({ iconUrl: markerCameraIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})

interface MapProps extends RouteComponentProps<{
  owner_id: string;
}> {}

const Routes: React.FC<MapProps> = ({match}) => {
  
  const {t} = useTranslation()
  var creator_id = localStorage.getItem('creator::id')
  if (
    MyConst.menuSettings.freeAccess.indexOf(window.location.pathname) !== -1
  ) {
    //console.log("You have free access here!! :)");
  } else {
    if (creator_id !== null) {
      //console.log("Hello you have granted access, " + creator_id);
    } else {
      console.log("You don't have acces to this area... ");
      window.location.href = "/Access/train-yourself";
    }
  }

  const [mapRoutes, setRoutes] = useState<MyRoute[]>([])
  useEffect(() => {
    fetch(MyConst.RestAPI + 'routes?created_by='+creator_id)
      .then(res => res.json())
      .then(setRoutes)
  }, [creator_id])

  // Default route data
  var name = MyConst.labels.routeName
  var zoom = MyConst.main_zoom

  // Route initial data
  var start = [MyConst.main_center[0], MyConst.main_center[1]]

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
    //end = r.geometry.coordinates[r.geometry.coordinates.length - 1]
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
      <IonItem key={index} href={'/LiveMap/navigate/'+r.id}>
        <IonLabel>0{index+1} - {t(r.name)}</IonLabel>
      </IonItem>
    ))
  }
  
  // TODO: Change with the common React way to do this!!!
  /*  const [fullMenu, setMenu] = useState<Menu[]>([])
    useEffect(() => {
      fetch(MyConst.menuDump + 'explore-and-equip.json').then(res => res.json()).then(setMenu)
    }, [])
    hoverFooterIcon(fullMenu)
    function hoverFooterIcon(menus: Menu[]) {
      if(menus[0]!== undefined){
        let location = 'explore-and-equip'
        let icon = ( menus[0].slug === location)?menus[0].active_icon:menus[0].inactive_icon;
        jQuery('#'+menus[0].slug).attr('src',icon)   
      }
    }*/
  // TODO: Change with the common React way to do this!!!


  function cleanTheRoutes(list: any){
    var result = []
    for(var i = 0; i < list.length; i++){
      result.push(list[i].map_data.data)
    }
    return result
  }

  function cleanThePlaces(list: any){
    var result = []
    for(var i = 0; i < list.length; i++){
      for(var z = 0; z < list[i].places.length; z++){
        result.push(list[i].places[z].map_data.data)
      }
    }
    console.log(result)
    return result
  }


  // Sadly, the GeoJSON comes twist from geojson.io. Then, I gonna twist  the content, So sorry u.u!!!
  function twistCoordinates(coordinates: any) {
    let result = []
    for(var i = 0; i < coordinates.length; i++){
      result.push([ coordinates[i][1], coordinates[i][0] ])
    }
    return result
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

          {/* Loading map features*/}
          {cleanTheRoutes(mapRoutes).map((r: any) => (
            r.features.map((r: any) => (
              setMapContent(r)
            )
          )))}

          {/* Loading places features */}
          {cleanThePlaces(mapRoutes).map((routes: any) => (
            routes.features.map((features: any) => (
              setMapContent(features)
            )
          )))} 

          {/* Loading route start meeting point */}
          <Marker
            key='startMarker'
            position={[start[1], start[0]]}
            icon={startIcon}
          ><Popup>{MyConst.messages.routeMeetingPoint}</Popup>
          </Marker>

          {/* Loading route end 
          <Marker
            key='endMarker'
            position={[end[1], end[0]]}
            icon={endIcon}
          ><Popup>{MyConst.messages.routeEnd}</Popup>
          </Marker>*/}

        </MapContainer>
        {renderRoutesList(mapRoutes)}
      </IonContent>
    </IonPage>
  )

}

export default Routes