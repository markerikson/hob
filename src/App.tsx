import React, { useEffect, useState } from 'react'

import { 
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react'

import { IonReactRouter } from '@ionic/react-router'
import {
  Redirect, Route,
} from 'react-router-dom'

import './components/i18n'
import { Plugins } from '@capacitor/core'

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
import Home       from './pages/Home'
import Access     from './pages/Access'// Will runs with soft login!!
import LiveMenu   from './pages/LiveMenu'
import Article    from './pages/Article'
import Routes     from './pages/Routes'
import LiveMap    from './pages/LiveMap'
import Navigation from './pages/Navigation'
import Equipment  from './pages/Equipment'

// TODO
import Settings   from './pages/Settings'
//import About       from './pages/About'
// Featured login, only registered users!! (FUTURE!)
// // import Login       from './pages/Login' 

// Show the splash for 4 seconds and then auto hide:
const { SplashScreen } = Plugins

SplashScreen.show({
  showDuration: 4000,
  autoHide: true
})

const App: React.FC = () => {

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
            <Route path='/' render={() => <Redirect to='/Home'/>} exact={true}/>            
            <Route path='/Home' component={Home}/>
            <Route path='/Access/:slug' component={Access}/>
            <Route path='/LiveMenu/:slug' component={LiveMenu}/>
            <Route path='/Article/:slug/:slide/:step' component={Article}/>
            <Route path='/Equipment/:slug' component={Equipment}/>
            <Route path='/Routes' component={Routes}/>
            <Route path='/Navigation' component={Navigation}/>
            <Route path='/LiveMap' component={LiveMap}/>
            <Route path='/Settings' component={Settings}/>
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