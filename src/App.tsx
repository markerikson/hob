import * as MyConst from './services/constants'
import React, { useEffect, useState } from 'react'
import { IonReactRouter,  } from '@ionic/react-router'
import { 
  IonApp,
  IonLabel, 
  IonRouterOutlet, 
  IonTabBar,   
  IonTabButton, 
  IonTabs 
} from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'

/* CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

// App main parts
import Home         from './pages/Home'
import Article      from './pages/Article'
import LiveMap      from './pages/LiveMap'

//Complements (future)
import LiveMenu     from './pages/menu/LiveMenu'

const my_menu = [
  {
    "id": 1,
    "name": "Home",
    "created_at": "2021-02-20T23:27:49.000Z",
    "updated_at": "2021-02-20T23:30:46.000Z",
    "ionic_resource": "LiveMenu",
    "main": true,
    "description": [],
    "label": [
      {
        "id": 1,
        "label": "Home",
        "language": {
          "id": 1,
          "name": "English (UK)",
          "code": "en_uk",
          "published_at": "2021-02-20T04:46:51.000Z",
          "created_at": "2021-02-20T04:46:47.000Z",
          "updated_at": "2021-02-20T04:46:51.000Z"
        }
      },
      {
        "id": 2,
        "label": "Home",
        "language": {
          "id": 2,
          "name": "Spanish (ES)",
          "code": "es_es",
          "published_at": "2021-02-20T04:47:09.000Z",
          "created_at": "2021-02-20T04:47:05.000Z",
          "updated_at": "2021-02-20T04:47:09.000Z"
        }
      }
    ],
    "children": [],
    "icon": {
      "id": 21,
      "name": "home.PNG",
      "alternativeText": "",
      "caption": "",
      "width": 174,
      "height": 151,
      "formats": null,
      "hash": "home_6819f55139",
      "ext": ".PNG",
      "mime": "image/png",
      "size": 5.79,
      "url": "/uploads/home_6819f55139.PNG",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "created_at": "2021-02-20T22:52:46.000Z",
      "updated_at": "2021-02-20T22:52:47.000Z"
    }
  },
  {
    "id": 2,
    "name": "Training",
    "created_at": "2021-02-20T23:31:13.000Z",
    "updated_at": "2021-02-21T00:52:48.000Z",
    "ionic_resource": "LiveMenu",
    "main": true,
    "description": [],
    "label": [
      {
        "id": 3,
        "label": "Training",
        "language": {
          "id": 1,
          "name": "English (UK)",
          "code": "en_uk",
          "published_at": "2021-02-20T04:46:51.000Z",
          "created_at": "2021-02-20T04:46:47.000Z",
          "updated_at": "2021-02-20T04:46:51.000Z"
        }
      },
      {
        "id": 4,
        "label": "Entrenamiento",
        "language": {
          "id": 2,
          "name": "Spanish (ES)",
          "code": "es_es",
          "published_at": "2021-02-20T04:47:09.000Z",
          "created_at": "2021-02-20T04:47:05.000Z",
          "updated_at": "2021-02-20T04:47:09.000Z"
        }
      }
    ],
    "children": [
      {
        "id": 1,
        "contents": [],
        "menus": [
          {
            "id": 6,
            "name": "Boat Types",
            "created_at": "2021-02-20T23:33:49.000Z",
            "updated_at": "2021-02-21T00:53:38.000Z",
            "ionic_resource": "LiveMenu",
            "main": false,
            "description": null,
            "icon": {
              "id": 11,
              "name": "4.1.2.Aa. Reverse.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_2_Aa_Reverse_98c00eac0a",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 17,
              "url": "/uploads/4_1_2_Aa_Reverse_98c00eac0a.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-02-20T22:52:46.000Z",
              "updated_at": "2021-02-20T22:52:46.000Z"
            }
          },
          {
            "id": 7,
            "name": "Controls",
            "created_at": "2021-02-20T23:36:25.000Z",
            "updated_at": "2021-02-21T01:07:42.000Z",
            "ionic_resource": "LiveMenu",
            "main": false,
            "description": null,
            "icon": {
              "id": 11,
              "name": "4.1.2.Aa. Reverse.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_2_Aa_Reverse_98c00eac0a",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 17,
              "url": "/uploads/4_1_2_Aa_Reverse_98c00eac0a.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-02-20T22:52:46.000Z",
              "updated_at": "2021-02-20T22:52:46.000Z"
            }
          },
          {
            "id": 8,
            "name": "Manoeveures",
            "created_at": "2021-02-20T23:36:51.000Z",
            "updated_at": "2021-02-21T23:27:57.000Z",
            "ionic_resource": "LiveMenu",
            "main": false,
            "description": null,
            "icon": {
              "id": 11,
              "name": "4.1.2.Aa. Reverse.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_2_Aa_Reverse_98c00eac0a",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 17,
              "url": "/uploads/4_1_2_Aa_Reverse_98c00eac0a.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-02-20T22:52:46.000Z",
              "updated_at": "2021-02-20T22:52:46.000Z"
            }
          },
          {
            "id": 9,
            "name": "Rules of the road",
            "created_at": "2021-02-20T23:37:19.000Z",
            "updated_at": "2021-02-21T01:04:02.000Z",
            "ionic_resource": "LiveMenu",
            "main": false,
            "description": null,
            "icon": {
              "id": 11,
              "name": "4.1.2.Aa. Reverse.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_2_Aa_Reverse_98c00eac0a",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 17,
              "url": "/uploads/4_1_2_Aa_Reverse_98c00eac0a.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-02-20T22:52:46.000Z",
              "updated_at": "2021-02-20T22:52:46.000Z"
            }
          },
          {
            "id": 10,
            "name": "Emergencies",
            "created_at": "2021-02-20T23:37:41.000Z",
            "updated_at": "2021-02-21T01:04:41.000Z",
            "ionic_resource": "LiveMenu",
            "main": false,
            "description": null,
            "icon": {
              "id": 11,
              "name": "4.1.2.Aa. Reverse.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_2_Aa_Reverse_98c00eac0a",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 17,
              "url": "/uploads/4_1_2_Aa_Reverse_98c00eac0a.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-02-20T22:52:46.000Z",
              "updated_at": "2021-02-20T22:52:46.000Z"
            }
          }
        ]
      }
    ],
    "icon": {
      "id": 19,
      "name": "owl.PNG",
      "alternativeText": "",
      "caption": "",
      "width": 112,
      "height": 109,
      "formats": null,
      "hash": "owl_e45f0349d9",
      "ext": ".PNG",
      "mime": "image/png",
      "size": 4.67,
      "url": "/uploads/owl_e45f0349d9.PNG",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "created_at": "2021-02-20T22:52:46.000Z",
      "updated_at": "2021-02-20T22:52:47.000Z"
    }
  },
  {
    "id": 3,
    "name": "Explore & Equip",
    "created_at": "2021-02-20T23:31:50.000Z",
    "updated_at": "2021-02-21T01:05:22.000Z",
    "ionic_resource": "LiveMenu",
    "main": true,
    "description": [],
    "label": [
      {
        "id": 5,
        "label": "Explore & Equip",
        "language": {
          "id": 1,
          "name": "English (UK)",
          "code": "en_uk",
          "published_at": "2021-02-20T04:46:51.000Z",
          "created_at": "2021-02-20T04:46:47.000Z",
          "updated_at": "2021-02-20T04:46:51.000Z"
        }
      },
      {
        "id": 6,
        "label": "Exploración y equipo",
        "language": {
          "id": 2,
          "name": "Spanish (ES)",
          "code": "es_es",
          "published_at": "2021-02-20T04:47:09.000Z",
          "created_at": "2021-02-20T04:47:05.000Z",
          "updated_at": "2021-02-20T04:47:09.000Z"
        }
      }
    ],
    "children": [
      {
        "id": 8,
        "contents": [],
        "menus": [
          {
            "id": 11,
            "name": "Routes",
            "created_at": "2021-02-20T23:38:05.000Z",
            "updated_at": "2021-02-21T00:15:19.000Z",
            "ionic_resource": "RoutesList",
            "main": false,
            "description": null,
            "icon": {
              "id": 11,
              "name": "4.1.2.Aa. Reverse.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_2_Aa_Reverse_98c00eac0a",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 17,
              "url": "/uploads/4_1_2_Aa_Reverse_98c00eac0a.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-02-20T22:52:46.000Z",
              "updated_at": "2021-02-20T22:52:46.000Z"
            }
          },
          {
            "id": 12,
            "name": "Equipment",
            "created_at": "2021-02-20T23:38:33.000Z",
            "updated_at": "2021-02-21T00:24:29.000Z",
            "ionic_resource": "Equipment",
            "main": false,
            "description": null,
            "icon": {
              "id": 11,
              "name": "4.1.2.Aa. Reverse.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_2_Aa_Reverse_98c00eac0a",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 17,
              "url": "/uploads/4_1_2_Aa_Reverse_98c00eac0a.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-02-20T22:52:46.000Z",
              "updated_at": "2021-02-20T22:52:46.000Z"
            }
          }
        ]
      }
    ],
    "icon": {
      "id": 6,
      "name": "exploreequip.PNG",
      "alternativeText": "",
      "caption": "",
      "width": 109,
      "height": 103,
      "formats": null,
      "hash": "exploreequip_bc40f3273e",
      "ext": ".PNG",
      "mime": "image/png",
      "size": 4.51,
      "url": "/uploads/exploreequip_bc40f3273e.PNG",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "created_at": "2021-02-20T22:52:45.000Z",
      "updated_at": "2021-02-20T22:52:45.000Z"
    }
  },
  {
    "id": 4,
    "name": "Navigate",
    "created_at": "2021-02-20T23:32:37.000Z",
    "updated_at": "2021-02-20T23:32:43.000Z",
    "ionic_resource": "LiveMenu",
    "main": true,
    "description": [],
    "label": [
      {
        "id": 7,
        "label": "Navigate",
        "language": {
          "id": 1,
          "name": "English (UK)",
          "code": "en_uk",
          "published_at": "2021-02-20T04:46:51.000Z",
          "created_at": "2021-02-20T04:46:47.000Z",
          "updated_at": "2021-02-20T04:46:51.000Z"
        }
      },
      {
        "id": 8,
        "label": "Navegación",
        "language": {
          "id": 2,
          "name": "Spanish (ES)",
          "code": "es_es",
          "published_at": "2021-02-20T04:47:09.000Z",
          "created_at": "2021-02-20T04:47:05.000Z",
          "updated_at": "2021-02-20T04:47:09.000Z"
        }
      }
    ],
    "children": [],
    "icon": {
      "id": 20,
      "name": "navigate.PNG",
      "alternativeText": "",
      "caption": "",
      "width": 122,
      "height": 109,
      "formats": null,
      "hash": "navigate_45e086ac39",
      "ext": ".PNG",
      "mime": "image/png",
      "size": 2.52,
      "url": "/uploads/navigate_45e086ac39.PNG",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "created_at": "2021-02-20T22:52:46.000Z",
      "updated_at": "2021-02-20T22:52:47.000Z"
    }
  },
  {
    "id": 5,
    "name": "Assistance",
    "created_at": "2021-02-20T23:32:59.000Z",
    "updated_at": "2021-02-20T23:33:12.000Z",
    "ionic_resource": "LiveMenu",
    "main": true,
    "description": [],
    "label": [
      {
        "id": 9,
        "label": "Assistance",
        "language": {
          "id": 1,
          "name": "English (UK)",
          "code": "en_uk",
          "published_at": "2021-02-20T04:46:51.000Z",
          "created_at": "2021-02-20T04:46:47.000Z",
          "updated_at": "2021-02-20T04:46:51.000Z"
        }
      },
      {
        "id": 10,
        "label": "Asistencia",
        "language": {
          "id": 2,
          "name": "Spanish (ES)",
          "code": "es_es",
          "published_at": "2021-02-20T04:47:09.000Z",
          "created_at": "2021-02-20T04:47:05.000Z",
          "updated_at": "2021-02-20T04:47:09.000Z"
        }
      }
    ],
    "children": [],
    "icon": {
      "id": 4,
      "name": "assistance.PNG",
      "alternativeText": "",
      "caption": "",
      "width": 119,
      "height": 120,
      "formats": null,
      "hash": "assistance_239417fa65",
      "ext": ".PNG",
      "mime": "image/png",
      "size": 3.6,
      "url": "/uploads/assistance_239417fa65.PNG",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "created_at": "2021-02-20T22:52:45.000Z",
      "updated_at": "2021-02-20T22:52:45.000Z"
    }
  }
]

interface MenuInterface {
  id:   number,
  name: string,
  icon: Icon,
  ionic_resource: string
  label?: Label[],
}

interface Icon {
  url: string
}

interface Label {
  label: string,
  language: Language
}

interface Language {
  name: string,
  code: string
}

const App: React.FC = () => {

  /*const [menus, setMenus] = useState<MenuInterface[]>([])
  useEffect(() => {
    fetch('http://161.97.167.92:1337/app-menus?main=true')
    .then(res => res.json())
    .then(setMenus)
  }, [])*/

  // Setting footer icons from call...
  function renderFooterMenu(list: MenuInterface[]) {
    return list.map((r: MenuInterface, index) => (
      <IonTabButton key={'footer_'+index} tab={r.name} href={r.ionic_resource+'/'+r.id} disabled={false}>
        <img src={MyConst.RestStorage + r.icon.url} alt={r.name.toString()} />
        <IonLabel>{r.name}</IonLabel>
      </IonTabButton>
    ))
  }

  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>            
            <Route path='/' render={() => <Redirect to='/Home'/>} exact={true}/>
            <Route path='/Home' component={Home}/>
            <Route path='/LiveMenu/:id' component={LiveMenu}/>
            <Route path='/LiveMap/:route' component={LiveMap}/>
            <Route path='/Article/:tag' component={Article}/>
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            {renderFooterMenu(my_menu)}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App