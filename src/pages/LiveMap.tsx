import * as MyConst from '../static/constants'
import React, { useState, useEffect  } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from 'jquery'

// About leafLet
import L from 'leaflet'
import {
  MapContainer,
  TileLayer,
  /*
  Popup,
  Marker,
  Polygon,
  Polyline,
  */
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Models for the route
import { Menu } from '../models/Menu'
import { MyRoute } from '../models/MyRoute'
//import { RouteData } from '../models/RouteData'

// Custom Map Markers
import markerEndIconSvg from '../static/icons/end-marker.svg'
import markerStartIconSvg from '../static/icons/start-marker.svg'
import markerCameraIconSvg from '../static/icons/camera-marker.svg'
//------------------------------------------------------------------
const endIcon = new L.Icon({ iconUrl: markerEndIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const startIcon = new L.Icon({ iconUrl: markerStartIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const cameraIcon = new L.Icon({ iconUrl: markerCameraIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})

interface MapProps extends RouteComponentProps<{
  slug: string
  id: string
}> {}

const LiveMap: React.FC<MapProps> = ({match}) => {
  
  const {t} = useTranslation()

  var creator_id = localStorage.getItem("creator::id");
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

  // Default route data
  //var name = MyConst.labels.routeName
  //var description = JSON.parse(JSON.stringify(MyConst.my_route)) //sample test!! 
  var zoom = MyConst.main_zoom
  //var data = JSON.parse(JSON.stringify(MyConst.my_route)) //sample test!!

  // Route initial data
  var start = [MyConst.main_center[0], MyConst.main_center[1]]
  var end   = [MyConst.main_center[0], MyConst.main_center[1]]

  const [route, setRoute] = useState<MyRoute[]>([])
  useEffect(() => {
    fetch(MyConst.RestAPI + 'my-routes?id='+match.params.id)
      .then(res => res.json())
      .then(setRoute)
  }, [match.params.id])
 
  if(typeof route[0] !== 'undefined'){
    //name = route[0].name
    //description = JSON.parse(JSON.stringify(route[0].description))
    //zoom = route[0].zoom
    //data = route[0].map_data    
  }else{
    if(MyConst.JustTesting){
      console.log(MyConst.messages.noData)
    } 
  }

  jQuery('.hob-footer').removeClass('hidden')





  jQuery('#navigate').attr('src', jQuery('#navigate').data('active'))









  // Sadly, the GeoJSON comes twist from geojson.io. Then, I gonna twist  the content, So sorry u.u!!!
  /*function twistCoordinates(coordinates: any) {
    let result = []
    for(var i = 0; i < coordinates.length; i++){
      result.push([ coordinates[i][1], coordinates[i][0] ])
    }
    return result
  }

  // Set a sort of contents in a map...
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

  // Set a Polygon
  function setPolygon(r: any){
    var polygon = twistCoordinates(Object.values(r.geometry.coordinates[0]))
    return <Polygon
      key={Math.random()} 
      positions={[polygon]} 
      //pathOptions={MyConst.style.polygon}
    />
  }

  // Set a PolyLine
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

  // Set a Marker
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

  */

  const [fullMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.menuDump + 'navigate.json').then(res => res.json()).then(setMenu)
  }, [])


  // TODO:  Move to components, for now is only a little chapuza more
  function renderNavigateHeader(menus: Menu[]) {
    jQuery('#navigate').attr('src', jQuery('#navigate').data('active'))
    //jQuery('#train-yourself').attr('src', jQuery('#train-yourself').data('inactive'))
    //jQuery('#explore-and-equip').attr('src', jQuery('#explore-and-equip').data('inactive')) 
    //jQuery('#assistance').attr('src', jQuery('#assistance').data('inactive'))   
    return <IonToolbar>
      <IonTitle></IonTitle>
    </IonToolbar>
  }

  return (
    <IonPage>
      <IonHeader>
        {renderNavigateHeader(fullMenu)}
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
            /*onLoad={(e:any)=> { e.target._map.invalidateSize()}}*/
            attribution={MyConst.mapAttribution}
            url={MyConst.tileUrl}
          />

          {/* Loading map features
          {data.features.map((r: RouteData) => (
            r.type === 'Feature'
              ? setMapContent(r)
              : t(MyConst.messages.loading)
          ))} */}

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
          </Marker> */}

        </MapContainer>
      </IonContent>
    </IonPage>
  )

}

export default LiveMap