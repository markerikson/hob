import * as MyConst from '../static/constants'
import React, { useState, useEffect  } from 'react'
import { IonContent, IonPage, IonImg, IonGrid, IonRow, IonCol, IonThumbnail, IonItem, IonLabel } from '@ionic/react'
import { RouteComponentProps, useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'

// Ohhh!!! :D :D This code looks happy now ^_^
//import jQuery from 'jquery'

// About leafLet
import L from 'leaflet'
import { MapContainer,  TileLayer, Polyline, Popup, Marker, Polygon, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// Models for the route
import { Menu } from '../models/Menu'
import { MyRoute } from '../models/MyRoute'
//import { RouteData } from '../models/RouteData'

//------------------------------------------------------------------
// Custom Map Markers
//------------------------------------------------------------------

//import { constructOutline } from 'ionicons/icons'
import markerEndIconSvg from '../static/icons/end-marker.svg'
import markerStartIconSvg from '../static/icons/start-marker.svg'
import markerCameraIconSvg from '../static/icons/camera-marker.svg'

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
import { analytics } from 'ionicons/icons'

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

//------------------------------------------------------------------
const endIcon = new L.Icon({ iconUrl: markerEndIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const startIcon = new L.Icon({ iconUrl: markerStartIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const cameraIcon = new L.Icon({ iconUrl: markerCameraIconSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const icon01 = new L.Icon({ iconUrl: marker01, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})

interface MapProps extends RouteComponentProps<{
  owner_id: string;
}> {}

const Routes: React.FC<MapProps> = ({match}) => {
  
  const {t} = useTranslation()
  const history = useHistory();

  var creator_id = localStorage.getItem('creator::id')

  const [mapRoutes, setRoutes] = useState<MyRoute[]>([])
  useEffect(() => {
    fetch(MyConst.RestAPI + 'routes?created_by='+creator_id)
      .then(res => res.json())
      .then(setRoutes)
  }, [creator_id])

  const [fullMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.menuDump + "routes.json")
      .then((res) => res.json())
      .then(setMenu)
  }, [])

  //console.log(mapRoutes)

  // Default route data
  //var name = MyConst.labels.routeName
  var zoom = MyConst.main_zoom

  // Route initial data
  var start = [MyConst.main_center[0], MyConst.main_center[1]]
  var end = [MyConst.main_center[0], MyConst.main_center[1]]
  //var middle = [];

  function renderHeader(fullMenu: Menu[]) {
    //hoverFooterIcon(fullMenu)
    return fullMenu.map((r: Menu, i) =>
      <IonItem
        class='hob-header border-none remove_inner_bottom' key={Math.random()}>
        <IonImg
          class='back'
          onClick={() => history.goBack()}
          src={MyConst.icons.back}
          slot="start"
        ></IonImg>
        <IonThumbnail>      
          <IonImg src={r.active_icon} alt={t(r.name)}/>
        </IonThumbnail>
        <IonGrid>
          <IonRow>
            <IonCol><IonLabel class='header_title bold'>{t('Routes')}</IonLabel></IonCol>
          </IonRow>
          {/*<IonRow>
            <IonCol><IonLabel class='header_subtitle'>{t('')}</IonLabel></IonCol>
          </IonRow>*/}
        </IonGrid>        
        {/*<IonSearchbar placeholder='Type here...' value={search} showCancelButton='focus'></IonSearchbar>*/}
      </IonItem>
    )    
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

  function MiddleMarkers(mapRoutes: any){
    var middleCoords  = [];
    for (var i = 0; i < mapRoutes.length; i++) {
      var routeId = mapRoutes[i].id
      var mapData =  mapRoutes[i].map_data.data;
      var coordinates = mapData.features[0].geometry.coordinates
      var middleRoad = Math.floor(coordinates.length/2);
      if(coordinates[middleRoad][0] !== undefined && coordinates[middleRoad][1] !== undefined){
        middleCoords.push({ routeId: routeId, mapCoords: coordinates[middleRoad]})
      }
    }
    return middleCoords.map((mapLocation: any, index) => 
      <Marker
        key={Math.random()}
        position={[mapLocation.mapCoords[1], mapLocation.mapCoords[0]]}
        eventHandlers={{
          click: (e) => {
            history.push('/Route/Overview/'+mapLocation.routeId+'/0')
          },
        }}        icon={( index === 0 )
            ? icons["icon01"]
            : index === 1 
              ? icons["icon02"]
              : index === 2
                ? icons["icon03"]
                : index === 3
                  ? icons["icon04"]
                  : index === 4
                    ? icons["icon05"]
                    : index === 5
                      ? icons["icon06"]
                      : index === 6
                        ? icons["icon07"]
                        : index === 7 
                          ? icons["icon08"]
                          : index === 8 
                            ? icons["icon09"]
                            : index === 9 
                              ? icons["icon10"]
                              : icons["icon01"]
          }>
      </Marker>
    )
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
      <IonItem
        key={Math.random()}
        onClick={() => history.push('/Route/Overview/'+r.id+'/0')}
        >
        <IonLabel>0{index+1+' - '+r.name}</IonLabel>
      </IonItem>
    ))
  }

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
    //console.log(result)
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

  function LocationMarker() {
    const [position, setPosition] = useState({'lat':0, 'lng':0})
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo([start[1], start[0]], map.getZoom())
      },
    })  
    return position === null ? null : (
      <Marker position={[start[0], start[1]]}>
        <Popup>{t(MyConst.messages.youAreHere)}</Popup>
      </Marker>
    )
  }

  function setMap(){
    //* Loading map
    return (
      <MapContainer
        key='mainMap' 
        style={MyConst.style.routes}
        center={[start[0], start[1]]}
        zoom={zoom}
        scrollWheelZoom={false}
        >

      <TileLayer
        attribution={MyConst.mapAttribution}
        url={MyConst.mapTiles.customized}
      />

      {/* Loading map features*/}
      {cleanTheRoutes(mapRoutes).map((r: any) => (
        r.features.map((r: any) => ( setMapContent(r) )
      )))}

      {/* Loading places features */}
      {cleanThePlaces(mapRoutes).map((route: any) => (
        route.features.map((features: any) => ( setMapContent(features) ) )
      ))} 

      {/* Loading route start meeting point, base blah blah */}
      <Marker
        key='startMarker'
        position={[start[1], start[0]]}
        icon={startIcon}
      ><Popup>{MyConst.messages.routeMeetingPoint}</Popup>
      </Marker>

      {/* Loading route end */}
      <Marker
        key='endMarker'
        position={[end[1], end[0]]}
        icon={endIcon}
      ><Popup>{MyConst.messages.routeEnd}</Popup>
      </Marker>

      {/* Putting middle way markers*/}
      {MiddleMarkers(mapRoutes)}

      {/* Getting real location now!! */}
      <LocationMarker />      

    </MapContainer>)
  }

  return (
    <IonPage>
      {renderHeader(fullMenu)}
      <IonContent>
        {setMap()}        
        {renderRoutesList(mapRoutes)}
      </IonContent>
    </IonPage>
  )

}

export default Routes