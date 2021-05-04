import * as MyConst from '../static/constants'
import React, { useState, useEffect  } from 'react'
import { IonContent, IonPage, IonImg, IonThumbnail, IonItem, IonSelect, IonSelectOption, useIonViewWillEnter } from '@ionic/react'
import { 
  //RouteComponentProps,
  useHistory
} from 'react-router'
import { useTranslation } from 'react-i18next'
import jQuery from 'jquery' // Ohhh!!! :D :D This code looks happy now ^_^

import L from 'leaflet'
import { MapContainer,  TileLayer, Polyline, Popup, Marker, Polygon, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { Menu } from '../models/Menu'
import { MyRoute } from '../models/MyRoute'

//------------------------------------------------------------------
// Custom Map Markers
//------------------------------------------------------------------
import cameraMarkerSvg from '../static/icons/camera-marker.svg'
import startMarkerSvg from '../static/icons/start-marker.svg'
import endMarkerSvg from '../static/icons/end-marker.svg'
import myLocationMarkerSvg from '../static/icons/mylocation-marker.svg'
import baseMarkerSvg from '../static/icons/base-marker.svg'
import restaurantMarkerSvg from '../static/icons/restauran-marker.svg'
import standarMarkerSvg from '../static/icons/standar-marker.svg'
//------------------------------------------------------------------
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
console.log(icons)

const cameraMarker = new L.Icon({ iconUrl: cameraMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const startMarker = new L.Icon({ iconUrl: startMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const endMarker = new L.Icon({ iconUrl: endMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const myLocationMarker = new L.Icon({ iconUrl: myLocationMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const baseMarker = new L.Icon({ iconUrl: baseMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const restaurantMarker = new L.Icon({ iconUrl: restaurantMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
const standarMarker = new L.Icon({ iconUrl: standarMarkerSvg, iconSize: [32, 32], iconAnchor: [2, 2], popupAnchor: [0, -2]})
//------------------------------------------------------------------

const LiveMap: React.FC = () => {

  const {t} = useTranslation()
  const history = useHistory();
  var creator_id = localStorage.getItem('creator:id')
  var selected_route = localStorage.getItem('selected_route::id')

  useIonViewWillEnter(() => { toggleFooter() })
  // Show and hide the footer over LiveMenu and in advance ;)
  function toggleFooter(){
    //if(MyConst.JustTesting) console.info('Toggle footer! (LiveMenu::useIonViewWillEnter)')
    if( MyConst.menuSettings.hiddenFooter.indexOf(window.location.pathname) === -1){      
      jQuery('.footer_tab').removeClass('hidden')
    }else{
      jQuery('.footer_tab').addClass('hidden')
    }
  }

  jQuery('#button-train-yourself').attr('src', jQuery('#button-train-yourself').data('inactive')) 
  jQuery('#button-explore-and-equip').attr('src', jQuery('#button-explore-and-equip').data('inactive')) 
  jQuery('#button-navigate').attr('src', jQuery('#button-navigate').data('active')) 
  jQuery('#button-assistance').attr('src', jQuery('#button-assistance').data('inactive')) 
  
  jQuery('.leaflet-control-attribution').hide()

  const [mapRoutes, setRoutes] = useState<MyRoute[]>([])
  useEffect(() => {
    fetch(MyConst.RestAPI + 'routes?created_by='+creator_id)
      .then(res => res.json())
      .then(setRoutes)
  }, [creator_id])

  const [fullMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.menuDump + "navigate.json")
      .then((res) => res.json())
      .then(setMenu)
  }, [])

  // Default route data
  //var name = MyConst.labels.routeName
  var zoom = MyConst.main_zoom+2

  // Route initial data
  var start = [MyConst.main_center[0], MyConst.main_center[1]]
  var end = [MyConst.main_center[0], MyConst.main_center[1]]
  console.log(end)

  function renderHeader(fullMenu: Menu[], mapRoutes: any) {
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
        <IonItem 
          key='ItemRouteSelector'
          id='route_selector'>
          {/*<IonLabel position='stacked'>{t('Select your language')}</IonLabel>*/}
          <IonSelect
            id='map_route_selector'
            interface="popover"
            value={(selected_route !== '') ? Number(selected_route) : 0}
            cancelText={t('Dismiss')}
            onIonChange={e =>loadRoute(e.detail.value)}>
            <IonSelectOption key={'first_option'} value={0}><b>{t('Choose Route')}</b></IonSelectOption>
            {mapRoutes.map((route: any) =>
              <IonSelectOption
                key={route.id}
                value={route.id}>
                {route.name}
              </IonSelectOption>
            )}
          </IonSelect>
        </IonItem>
      </IonItem>
    )    
  }

  function loadRoute( routeId: number ){
    localStorage.setItem('selected_route::id', routeId.toString())
    window.location.href = '/LiveMap/navigate/'+routeId
  }

  function setRoutesPolylines(mapRoutes: any){
    return cleanTheRoutes(mapRoutes).map((r: any) => (
      r.features.map((r: any) => (
        setMapContent(r)
      )
    )))
  }
  
  function setRoutesMarkers(mapRoutes: any){
    var markers = [];
    for(var i = 0; i < mapRoutes.length; i++){
      var route = mapRoutes[i]
      if(route !== undefined){

        if(route.id === Number(selected_route)){
          for(var ii = 0; ii < route.places.length; ii++){
            var place = route.places[ii]
            var marker = place.map_marker
            for(var iii = 0; iii < place.map_data.data.features.length; iii++){
              var feature = place.map_data.data.features[iii]
              markers.push({
                'href' : '/Route/Overview/'+route.id+'/'+ii,
                'marker' : marker,
                'lat' : feature.geometry.coordinates[1],
                'lng' : feature.geometry.coordinates[0]
              })
            }
          }
        }
      }
    }
    return markers.map((marker: any) => ( 
      setGotoMarker(
        marker.lat,
        marker.lng, 
        marker.marker === 1 
          ? startMarker : marker.marker === 2
            ? endMarker : marker.marker === 3
              ? standarMarker : marker.marker === 4
                ? cameraMarker : marker.marker === 5
                  ? restaurantMarker : marker.marker === 7
                    ? myLocationMarker : marker.marker === 8
                      ? baseMarker : standarMarker,        
        marker.href)
    ))
  }



  function setMap(mapRoutes: any){
    return (
      <MapContainer
        key='mainMap2'
        id='mainMap2' 
        style={MyConst.style.map}
        center={[start[0], start[1]]}
        zoom={zoom}
      >

        <TileLayer
          attribution={MyConst.mapAttribution}
          url={MyConst.mapTiles.customized}
        />

        {setRoutesPolylines(mapRoutes)}
        {setRoutesMarkers(mapRoutes)}

        {/* Loading route start meeting point, base blah blah */}
        <Marker
          key='startMarker'
          position={[start[1], start[0]]}
          icon={startMarker}
        ><Popup>{MyConst.messages.routeMeetingPoint}</Popup>
        </Marker>

        <LocationMarker/>

      </MapContainer>
    )
  }

  // Sadly, the GeoJSON comes twist from geojson.io. Then, I gonna twist  the content, So sorry u.u!!!
  function twistCoordinates(coordinates: any) {
    let result = []
    for(var i = 0; i < coordinates.length; i++){
      result.push([ coordinates[i][1], coordinates[i][0] ])
    }
    return result
  }

  function cleanTheRoutes(list: any){
    var result = []
    for(var i = 0; i < list.length; i++){
      if(list[i].id === Number(selected_route)){
        result.push(list[i].map_data.data)
      }
    }
    return result
  }

  function setMarker(lat:number, long:number, icon: any, popContent:any, href: any){
    return (
      <Marker
        key={'marker_'+href}
        position={[lat, long]}
        icon={icon}
        eventHandlers={{
          click: (e) => {
            history.push(href)
          },
        }}
      >{ popContent ? <Popup>{popContent}</Popup> : '' }        
      </Marker>
    )
  }

  function setGotoMarker(lat:number, long:number, icon: any, href: any){
    return (
      <Marker
        key={'marker_'+href}
        position={[lat, long]}
        icon={icon}
        eventHandlers={{
          click: (e) => {
            window.location.href = href
          },
        }}
      >  
      </Marker>
    )
  }

  function setPolygon(r: any){
    var polygon = twistCoordinates(Object.values(r.geometry.coordinates[0]))
    return <Polygon
      key={'polygon_'+r.id} 
      positions={[polygon]} 
      //pathOptions={MyConst.style.polygon}
    />
  }

  function setPolyLine(r: any){
    var polyLine = twistCoordinates(Object.values(r.geometry.coordinates))
    start = r.geometry.coordinates[0]
    end = r.geometry.coordinates[r.geometry.coordinates.length - 1]
    return <Polyline
        key={'polyline_'+r.id} 
        positions={polyLine}
        //pathOptions={MyConst.style.polyLine}
      />
  }

  function setMapContent(r: any) {
    switch(r.geometry.type) {
      case 'Point':        
        return setMarker(r.geometry.coordinates[1], r.geometry.coordinates[0], cameraMarker, null, null)
      case 'Polygon':
        return setPolygon(r)
      case 'LineString':
        return setPolyLine(r)        
      default:
        if(MyConst.JustTesting){
          //console.log(MyConst.messages.unavailable.replace('#type#',r.geometry.type))
        }
    }
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
        map.invalidateSize()
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
      {renderHeader(fullMenu, mapRoutes)}
      <IonContent class='overflow_hidden'>
        {setMap(mapRoutes)}        
      </IonContent> 
    </IonPage>
  )

}

export default LiveMap