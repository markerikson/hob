import React, { useEffect, useState } from 'react'
//import { AppStateContext } from "../contexts/AppStateContext";
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import {
  Redirect, Route,
  //useLocation 
} from 'react-router-dom'

import './components/i18n'
//import FooterMenu from './components/FooterMenu'
import { Plugins } from '@capacitor/core'

// STYLE

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

// STYLE

// Models
import { Menu } from './models/Menu'

// App main pages
import LiveMenu from './pages/LiveMenu'
import Article  from './pages/Article'
import Home     from './pages/Home'
import Settings from './pages/Settings'
import Routes   from './pages/Routes'
import LiveMap  from './pages/LiveMap'
import Navigation from './pages/Navigation'

// Show the splash for 4 seconds and then auto hide:
const { SplashScreen } = Plugins
SplashScreen.show({
  showDuration: 4000,
  autoHide: true
})

const App: React.FC = () => {

  //const location = useLocation()

  const [main_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/main-menu.json').then(res => res.json()).then(setMenu)
  }, [])

  function renderFooterMenu(list: Menu[]) {    
    return list.map((r: Menu, index) => (
      <IonTabButton class='hob-footer' key={r.resource} tab={r.slug} href={r.resource} disabled={false}>
        <img 
          src={true ? r.active_icon : r.inactive_icon} 
          alt={r.name.toString()}
          width='60%'
          height='120px'
        />
      </IonTabButton>
    ))
  }

  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>            
            <Route path='/' render={() => <Redirect to='/LiveMenu/train-yourself'/>} exact={true}/>            
            <Route path='/Settings' component={Settings}/>
            <Route path='/LiveMenu/:slug' component={LiveMenu}/>
            <Route path='/Article/:article/:slide/:step' component={Article}/>
            <Route path='/Home' component={Home}/>
            <Route path='/Routes' component={Routes}/>
            <Route path='/Navigation' component={Navigation}/>
            <Route path='/LiveMap/:slug' component={LiveMap}/>
            {/*
            <Route path='/Support' component={Article}/>
            <Route path='/Sandbox' component={Sandbox}/>
            <Route path='/Sandbox2' component={Sandbox2}/>
            <Route path='/Sandbox3' component={Sandbox3}/>*/}
          </IonRouterOutlet>
          <IonTabBar slot='bottom' class='hob-footer'>
            {renderFooterMenu(main_menu)}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )

}

export default App