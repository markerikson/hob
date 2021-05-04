
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

export const menuSettings = {
  'hiddenFooter' : [ 
    '/Access',
    '/LiveMenu/home',
    '/Settings',
    '/Access/train-yourself',
    '/Access/explore-and-equip',
    '/Access/navigate',
    '/Access/assistance'
  ],
  'freeAccess' : [ '/LiveMenu/home', '/Access', '/Settings' ]
}

export const holdHoverFooterIcon = [
  '/LiveMenu/train-yourself',
  '/LiveMenu/explore-and-equip',
  '/LiveMap/navigate',
  '/LiveMenu/assistance'
]

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
  'routeMeetingPoint' : 'This is your meeting point!!',
  'routeEnd' : 'The route ends here...',
  'accessText' : 'Access to the routes and the incredible data ;)',
  'youAreHere' : 'You are here',

  // ACCESS FORM
  'accessFormSuggest' : '',

  'accessFormTitle' : 'Please put the access data!',

  'userKeyLabel' : 'USER EMAIL',
  'userKeyRequired' : 'User email is required...',

  'userPassLabel' : 'PASSWORD',
  'userPassRequired' : 'Password is required...',

  'submitAcces' : 'LOGIN',
  'submitLoading' : 'LOGIN',
}

export const mapboxToken = "pk.eyJ1IjoiZHJ1bGxhbiIsImEiOiJja2l4eDBpNWUxOTJtMnRuejE1YWYyYThzIn0.y7nuRLnfl72qFp2Rq06Wlg"

// Main labels
export const labels = { 
  'routeName' : 'Route name...'
}

export const homeHref = '/LiveMenu/home'
export const trainYourself = 'train-yourself'// Main after home!!

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
  'map' : { 'height': '95vh' , 'width': '100wh' },
  'routes' : {
    'height': '60vh',
    'width': '100wh',
    'scrollWheelZoom' :false,
    'zoomControl' : false,
  },
  'polyLine' : { fillColor: '#a2a2a2' },
  'polygon' : { fillColor: 'red' },
}

export const mapAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

export const mapTiles = {
  'basic': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  'customized': 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=3Vi6kgEIpBCTF4mZBN8z'
}

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