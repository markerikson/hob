import * as Const from './services/constants'

import React, { useEffect, useState } from 'react'
import { IonReactRouter } from '@ionic/react-router'

import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { square, triangle, images } from 'ionicons/icons'
import { Redirect, Route } from 'react-router-dom'
import axios from 'axios'

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
import Home         from './pages/menu/Home'
import Training     from './pages/menu/Training'
import ExploreEquip from './pages/menu/ExploreEquip'
import Navigate     from './pages/menu/Navigate'
import Assistance   from './pages/menu/Assistance'
import Routes       from './pages/menu/Routes'
import LiveMap      from './pages/menu/LiveMap'
import Route1        from './pages/menu/Route1'
import BoatTypes        from './pages/menu/BoatTypes'

const App: React.FC = () => {

  const [hooks, setHooks] = useState<any[]>([])

  useEffect(() => {
    fetch( Const.RestAPI + 'hooks?style=main')
      .then(res => res.json())
      .then(setHooks)
  }, [])

  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          
          <IonRouterOutlet>
            <Route path='/Home'           component={Home}          />
            <Route path='/Training'       component={Training}      />
            <Route path='/ExploreEquip'   component={ExploreEquip}  />
            <Route path='/Navigate'       component={Navigate}      />
            <Route path='/Routes'         component={Routes}      />
            <Route path='/Route1'         component={Route1}      />
            <Route path='/LiveMap'        component={LiveMap}      />
            <Route path='/BoatTypes'      component={BoatTypes}      />
            <Route path='/Assistance'     component={Assistance}    />
            <Route path='/' render={ () => <Redirect to='/Home'   /> } exact={true} />
          </IonRouterOutlet>

          <IonTabBar slot='bottom'>
            {hooks.map((hook, index) => {
              return(            
                <IonTabButton tab={hook.path} href={hook.path}>
                  <IonIcon icon={triangle} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
              )
            })}
          </IonTabBar>
          {/*<IonTabBar slot='bottom'>
            
            <IonTabButton tab='Home' href='/Home'>
              <IonIcon icon={triangle} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab='Training' href='/training'>
              <IonIcon icon={images} />
              <IonLabel>Train yourself</IonLabel>
            </IonTabButton>

            <IonTabButton tab='ExploreEquip' href='/ExploreEquip'>
              <IonIcon icon={square} />
              <IonLabel>Explore & Equipament</IonLabel>
            </IonTabButton>

            <IonTabButton tab='Navigate' href='/Navigate'>
              <IonIcon icon={square} />
              <IonLabel>Navigate</IonLabel>
            </IonTabButton>

            <IonTabButton tab='Assistance' href='/Assistance'>
              <IonIcon icon={square} />
              <IonLabel>Assistance</IonLabel>
            </IonTabButton>

          </IonTabBar>*/}

        </IonTabs>

      </IonReactRouter>

    </IonApp>

  )

}

export default App
