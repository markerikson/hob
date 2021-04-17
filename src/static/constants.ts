
// MAIN DEFAULTS !!
  export const DefaultLanguage = 'en-GB'
  // Cors seted: none!!
  export const corsSetted = false
  // App main user data!!
  export const appSuperUser = 'system-app-user@maindomain.xyz'
  export const appSuperPass = 'Qwer1234'
  // The origin of backoffice stuff for the app
  export const MyIP = '161.97.167.92'
  export const originRoot = 'http://'+MyIP+':1337'
// MAIN DEFAULTS !!


// Data dump origins!!! ;) TODO: clean duplicated ;);)
export const LocalAPI = originRoot+'/'
export const RestAPI = originRoot+'/'
export const RestStorage = originRoot
export const PHOTO_STORAGE = RestAPI + 'uploads/'






// TESTING PURPOSES!!!
export const JustTesting = true
// TESTING PURPOSES!!!

  // App ONLY FIRST TEST test!!
  // TODO: MOVE TO 100% DINAMIC DISABLING JUST TESTING
  export const accesUserKey = 'client-1-user-1@someone.com'// TODO: would be email, nickname....
  export const accesUserPass = 'Qwer1234'
  // App ONLY FIRST TEST test!!

// TESTING PURPOSES!!!










// OTHERS


// Main messages
export const messages = { 
  'noData' : 'Waiting remote data... o.o!!',
  'unavailable' : 'The type #type# is missed u.u!!',
  'loading' : 'Loading ^_^!',
  'routeStart' : 'The route starts here...',
  'routeEnd' : 'The route ends here...',

  // ACCESS FORM

  'accessFormTitle' : 'Access to the restricted data!!',

  'userKeyLabel' : 'Owner alias',
  'userKeyRequired' : 'User key is required...',

  'userPassLabel' : 'Access key',
  'userPassRequired' : 'Accessc key is required...',

  'submitAcces' : 'Access',
}

// Main labels
export const labels = { 
  'routeName' : 'Route name...'
}

export const hideFooter = ['Home', ]

// Main icons
export const icons = {
  'back' : '/assets/images/arrow-left.svg',
  'camera' : 'leaflet/dist/images/marker-icon.png',//
  'start' : 'leaflet/dist/images/marker-icon.png',//
  'end' : 'leaflet/dist/images/marker-icon.png',//
  'mapMarker' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/390px-Map_marker.svg.png',
}

// Static Dumped
export const publicDump   = 'assets/dump/'
export const mainMenu     = publicDump+'menus/main-menu.json'
export const menuDump     = publicDump+'menus/menu-'
export const subMenuDump  = publicDump+'menus/sub-menu-'
export const articleDump  = publicDump+'articles/article-'
export const slideDump    = publicDump+'articles/slides/slide-'

export const splashScreen = {
  showDuration: 4000,
  autoHide: true
}

export const fadeVelocity = 300

// Map style and basics
export const style = {
  'map' : { 'width': '100%', 'height': '80vh' },
  'polyLine' : { fillColor: '#a2a2a2' },
  'polygon' : { fillColor: 'red' },
}

export const mapAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
export const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

// Map initial data
export const main_zoom = 13
export const main_center : [number, number] = [ 39.798052, 2.6952100 ]

export const slideOpts = {
  initialSlide: '0',
  speed: 500,
  autoplay: false,
  autoHeight: false,
  centeredSlides: true,
  centeredSlidesBounds: true,
  spaceBetween: 0,
  loop: false
}

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