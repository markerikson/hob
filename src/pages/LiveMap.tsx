import * as MyConst from '../static/constants'
import React, { useState, useEffect  } from 'react'
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
   //useIonViewWillEnter
} from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from 'jquery'

// About leafLet
import L from 'leaflet'
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
  /*
  Polygon,
  Polyline,
  */
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Models for the route
import { Menu } from '../models/Menu'
import { MyRoute } from '../models/MyRoute'


//------------------------------------------------------------------
// Custom Map Markers
//------------------------------------------------------------------
import cameraMarkerSvg from '../static/icons/camera-marker.svg'
import startMarkerSvg from '../static/icons/start-marker.svg'
import endMarkerSvg from '../static/icons/end-marker.svg'
import myLocationMarkerSvg from '../static/icons/mylocation-marker.svg'
/*
import baseMarkerSvg from '../static/icons/base-marker.svg'
import restaurantMarkerSvg from '../static/icons/restauran-marker.svg'
import standarMarkerSvg from '../static/icons/standar-marker.svg'
*/

import marker01 from '../static/icons/01.svg'
import marker02 from '../static/icons/02.svg'
import marker03 from '../static/icons/03.svg'
import marker04 from '../static/icons/04.svg'
import marker05 from '../static/icons/05.svg'
import marker06 from '../static/icons/06.svg'
import marker07 from '../static/icons/07.svg'
import marker08 from '../static/icons/08.svg'
import marker09 from '../static/icons/09.svg'
import marker10 from '../static/icons/00.svg'

//------------------------------------------------------------------
const icons = {
  'icon01' : new L.Icon({ iconUrl: marker01, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
  'icon02' : new L.Icon({ iconUrl: marker02, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
  'icon03' : new L.Icon({ iconUrl: marker03, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
  'icon04' : new L.Icon({ iconUrl: marker04, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
  'icon05' : new L.Icon({ iconUrl: marker05, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
  'icon06' : new L.Icon({ iconUrl: marker06, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
  'icon07' : new L.Icon({ iconUrl: marker07, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
  'icon08' : new L.Icon({ iconUrl: marker08, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
  'icon09' : new L.Icon({ iconUrl: marker09, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
  'icon10' : new L.Icon({ iconUrl: marker10, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]}),
}

const cameraMarker = new L.Icon({ iconUrl: cameraMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const startMarker = new L.Icon({ iconUrl: startMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const endMarker = new L.Icon({ iconUrl: endMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const myLocationMarker = new L.Icon({ iconUrl: myLocationMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
/*
const baseMarker = new L.Icon({ iconUrl: baseMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const restaurantMarker = new L.Icon({ iconUrl: restaurantMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const standarMarker = new L.Icon({ iconUrl: standarMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
*/

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
      //console.log("You don't have acces to this area... ");
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
  //var end   = [MyConst.main_center[0], MyConst.main_center[1]]

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
      //console.log(MyConst.messages.noData)
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

  function LocationMarker() {

    const [position, setPosition] = useState({'lat':0, 'lng':0})
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
      load(e) {
        e.target.map.invalidateSize()
      }
    })

    return position === null ? null : (
      <Marker
        position={map.getCenter()}
        icon={myLocationMarker}
        >
        <Popup>{t(MyConst.messages.youAreHere)}</Popup>
      </Marker>
    )
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
            url={MyConst.mapTiles.customized}
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
          
          <LocationMarker/>

        </MapContainer>
      </IonContent>
    </IonPage>
  )

}

export default LiveMap