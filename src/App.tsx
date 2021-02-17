import * as MyConst from './services/constants'

import React, { useEffect, useState } from 'react'
import { IonReactRouter,  } from '@ionic/react-router'

import { 
  IonApp, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet, 
  IonTabBar,   
  //useIonViewDidEnter,
  //useIonViewDidLeave,
  //useIonViewWillEnter,
  //useIonViewWillLeave, 
  IonTabButton, 
  IonTabs 
} from '@ionic/react'

import { triangle } from 'ionicons/icons'
import { Redirect, Route } from 'react-router-dom'

//import { defineCustomElements } from '@ionic/pwa-elements/loader'
//import axios from 'axios'

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

//Others....
import { loadConfData } from './data/sessions/sessions.actions';
import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions';

/* TODO: PUT SOMEWHERE THE COMPLETE EXTRACTED DATA FOR GET IT FROM IN APP AS INIT APP COMPLEXITY */ 
interface HookInterface {
  name: string,
  path: string,
  icon: Icon,
  tag: string,
  childrens?: object,
  app_hooks_translation?: Translations
}
interface Translations {
  title_translation?: string,
  language_translation?: {
    tag: string
  }
}
interface Icon {
  url: string
}

interface DispatchProps {
  loadConfData: typeof loadConfData
  loadUserData: typeof loadUserData
  setIsLoggedIn: typeof setIsLoggedIn
  setUsername: typeof setUsername
}

const App: React.FC = () => {

  const [hooks, setHooks] = useState<any[]>([])

  useEffect(() => {
    fetch('http://161.97.167.92:1337/hooks?style=main')
    .then(res => res.json())
    .then(setHooks)
  }, [])

  function renderFooterMenu(list: HookInterface[]) {
    return list.map((item:HookInterface, index) => (
      <IonTabButton key={'footer_'+index} tab={item.tag} href={item.path+'/'+item.tag} disabled={false}>
        <img src={MyConst.RestStorage + item.icon.url} alt={item.name.toString()} />
        {item?.app_hooks_translation?.language_translation?.tag === 'es_es' && <IonLabel>{item.app_hooks_translation.title_translation}</IonLabel> }
      </IonTabButton>
    ))
  }

  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>

          <IonRouterOutlet>
            
            <Route path='/' render={() => <Redirect to='/Home'/>} exact={true}/>
            
            {/* Main routes */}
            <Route path='/Home' component={Home}/>
            <Route path='/LiveMenu/:tag' component={LiveMenu}/>
            <Route path='/LiveMap/:route' component={LiveMap}/>
            <Route path='/Article/:tag' component={Article}/>

            {/*<Route path="/logout" render={() => {
              return <RedirectToLogin
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
              />;
            }}/>*/}

          </IonRouterOutlet>

          <IonTabBar slot='bottom'>
            <IonTabButton tab='/Home' href="/Home">
              <IonIcon icon={triangle} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            {renderFooterMenu(hooks)}
          </IonTabBar>

        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )

}

export default App