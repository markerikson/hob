import React, { useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polyline } from 'react-leaflet'
import { Plugins } from '@capacitor/core'
import { useTranslation } from 'react-i18next'

// About leafLet
import 'leaflet/dist/leaflet.css'

import L from 'leaflet';
//import { GeoJSON, Marker, Popup, useMapEvents } from 'react-leaflet';

//import { Plugins } from '@capacitor/core';

const styleMap = { 'width': '100%', 'height': '80vh' }  
const { Geolocation } = Plugins

// Interfaces
//import { Content } from '../models/Content'
//import { RouteData } from '../models/RouteData'
/*
const my_route = {
  "features": [
    {
      "type": "Feature",
      "properties": {
        "PARK_ID": 960,
        "NAME": "Bearbrook Skateboard Park",
        "DESCRIPTIO": "Flat asphalt surface, 5 components"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [2.6952100, 39.798052]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "PARK_ID": 1219,
        "NAME": "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)",
        "DESCRIPTIO": "Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [2.6952100, 39.798052]
      }
    }
  ]
}
*/

const my_route = [
  {
    "type": "Feature",
    "properties": {
      "name": "Coors Field",
      "amenity": "Baseball Stadium",
      "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [
          2.694740295410156,
          39.795809579006914
        ],
        [
          2.6921653747558594,
          39.79449063992477
        ],
        [
          2.6905345916748047,
          39.79482037706643
        ],
        [
          2.6869297027587886,
          39.79772199575064
        ],
        [
          2.6870155334472656,
          39.79989812942857
        ],
        [
          2.6903629302978516,
          39.805371130943854
        ],
        [
          2.6987743377685547,
          39.812953485405586
        ],
        [
          2.701435089111328,
          39.813612781053344
        ],
        [
          2.703065872192383,
          39.811832668291416
        ],
        [
          2.703065872192383,
          39.809854711155005
        ],
        [
          2.703237533569336,
          39.80847010729649
        ],
        [
          2.7040958404541016,
          39.81097556051997
        ],
        [
          2.706155776977539,
          39.81262383521031
        ],
        [
          2.7083873748779297,
          39.814008355406564
        ],
        [
          2.710275650024414,
          39.81532692014216
        ],
        [
          2.7119922637939453,
          39.817238794077774
        ],
        [
          2.713451385498047,
          39.81908469086112
        ],
        [
          2.7196311950683594,
          39.822908176476936
        ],
        [
          2.724609375,
          39.82356737663286
        ],
        [
          2.726926803588867,
          39.823501456901866
        ],
        [
          2.7257680892944336,
          39.82412769179301
        ],
        [
          2.7254676818847656,
          39.825215349354366
        ],
        [
          2.727055549621582,
          39.828478218731455
        ],
        [
          2.742290496826172,
          39.834640993640946
        ],
        [
          2.74658203125,
          39.83437735683739
        ],
        [
          2.750015258789062,
          39.8314772852108
        ],
        [
          2.7489852905273438,
          39.828577091142016
        ],
        [
          2.7482986450195312,
          39.82791793905047
        ]
      ]
    }
  }
]

interface MapProps extends RouteComponentProps<{
  id: string;
}> {}


const LiveMap: React.FC<MapProps> =  ({match}) => {
  
  const { t } = useTranslation()
  //const position = [this.state.lat, this.state.lng]

  /*
  const [route, setRoute] = useState<MyRoute[]>([])
  useEffect(() => {
    fetch('http://161.97.167.92:1337/my-routes?id='+match.params.id)
      .then(res => res.json())
      .then(setRoute)
  }, [match.params.id])

  // get the users current position
  //const position = await Geolocation.getCurrentPosition();

  // grab latitude & longitude
  //const latitude = position.coords.latitude;
  //const longitude = position.coords.longitude;
  /*const position = [51.505, -0.09]
  function LocationMarker() {

    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={[39.798052, 2.6952100]}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }  
  
  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  L.geoJSON(someGeojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(map);
  
  const [activePoi, setActivePoi] = useState(null);

  var geoJsonLayer = L.geoJSON(my_route, {
    onEachFeature: function (feature, layer) {
      if (layer instanceof L.Polyline) {
        layer.setStyle({
          'color': feature.properties.color
        });
      }
    }
  });*/
   

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