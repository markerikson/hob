import * as MyConst from '../src/static/constants'
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  //useIonViewWillEnter,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { IonReactRouter } from '@ionic/react-router'
//import { useHistory } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
import './components/i18n'
//import axios from 'axios'
//import { Plugins } from '@capacitor/core'

//CSS required for Ionic components to work properly
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

// Optional CSS utils that can be commented out
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

// Theme variables
import './theme/variables.css'
import './theme/myVariables.css'

// Models
import { Menu } from './models/Menu'

// App main pages
import Access     from './pages/Access'// Login
import LiveMenu   from './pages/LiveMenu'
import Article    from './pages/Article'
import Routes     from './pages/Routes'
import LiveMap    from './pages/LiveMap'
import Equipment  from './pages/Equipment'
import Settings   from './pages/Settings'

//const { SplashScreen } = Plugins
//SplashScreen.show(MyConst.splashScreen)

const App: React.FC = () => {

  const [mainMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.mainMenu).then(res => res.json()).then(setMenu)
  }, [])

  function renderFooterMenu(list: Menu[]) {
    return <IonTabBar
      slot='bottom'
      class={'hob-footer'}>
      {list.map((r: Menu, index) => (
        <IonTabButton
          key={r.resource}
          tab={r.slug}
          href={r?.resource}
          disabled={false}
          class=''>
          <img 
            id={r.slug}
            alt={r.name}
            src={r.inactive_icon}
            data-active={r.active_icon}
            data-inactive={r.inactive_icon}
            className='footer_button'
          />
        </IonTabButton>
      ))}
    </IonTabBar>
  }

  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path='/' render={() => <Redirect to={MyConst.homeHref}/>} exact={true}/>         
            <Route path='/Home' render={() => <Redirect to={MyConst.homeHref}/>} exact={true}/>         
            <Route path='/Access/:slug' component={Access}/>
            <Route path='/LiveMenu/:slug' component={LiveMenu}/>            
            <Route path='/LiveMap/navigate' component={LiveMap}/>
            <Route path='/Article/:slug/:slide/:step' component={Article}/>            
            <Route path='/Equipment/:slug' component={Equipment}/>
            <Route path='/Routes' component={Routes}/>
            <Route path='/LiveMap' component={LiveMap}/>
            <Route path='/Settings' component={Settings}/>
          </IonRouterOutlet>          
          {renderFooterMenu(mainMenu)}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )

}

export default App