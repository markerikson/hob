// Main defaults!!
export const DefaultLanguage = 'en-GB'

// Data dump origin!!
export const LocalAPI = 'http://localhost:1337/'
export const RestAPI = 'http://161.97.167.92:1337/'
export const RestStorage = 'http://161.97.167.92:1337'
export const PHOTO_STORAGE = RestAPI + 'uploads/'

// TESTING PURPOSES!!!
export const JustTesting = true

// Main messages
export const messages = { 
  'noData' : 'Waiting remote data... o.o!!',
  'unavailable' : 'The type #type# is missed u.u!!',
  'loading' : 'Loading ^_^!',
}

export const labels = { 
  'routeName' : 'Route name...'
}

export const icons = {
  'back' : '/assets/images/arrow-left.svg',
  'mapMarker' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/390px-Map_marker.svg.png',
}

export const mainMenu = 'assets/dump/menus/main-menu.json'

// Static Dumped directories
export const menuDump = 'assets/dump/menus/menu-'
export const subMenuDump = 'assets/dump/menus/sub-menu-'

// Sample user data!!
export const sample_user = 'reader@strapi.io'
export const sample_password = '2Y2s4qmliad'

// Map style and basics
export const styleMap = { 'width': '100%', 'height': '80vh' }
export const fillBlueOptions = { fillColor: 'blue' }
export const mapAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
export const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

// Map initial data
export const main_zoom = 13
export const main_center : [number, number] = [ 39.798052, 2.6952100 ]

export const my_route = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            2.694740295410156,
            39.795809579006914
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": ""
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.703237533569336,
          39.808453623749244
        ]
      }
    }
  ]
}

//