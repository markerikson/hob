import React, { useEffect, useState } from 'react'
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter,  } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
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

// STYLE

// App Components
import Article  from './components/Article'

// App main pages
import Home     from './pages/Home'
import LiveMenu from './pages/LiveMenu'
import Settings from './pages/Settings'
import Routes   from './pages/Routes'
//import LiveMap  from './pages/LiveMap'

import { Menu } from './models/Menu'

//import Sandbox from './pages/Sandbox'
//import Sandbox2 from './pages/Sandbox2'
//import Sandbox3 from './pages/Sandbox3'

// Show the splash for 4 seconds and then auto hide:
const { SplashScreen } = Plugins
SplashScreen.show({
  showDuration: 4000,
  autoHide: true
})

const App: React.FC = () => {

  const [main_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/others/main-menu.json').then(res => res.json()).then(setMenu)
  }, [])

  function renderFooterMenu(list: Menu[]) {    
    return list.map((r: Menu, index) => (
      <IonTabButton key={r.resource} tab={r.name} href={r.resource} disabled={false}>
        <img src={r.active_icon} alt={r.name.toString()} />
      </IonTabButton>
    ))
  }

  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>            
            <Route path='/' render={() => <Redirect to='/Home'/>} exact={true}/>
            <Route path='/LiveMenu/train-yourself' component={Home}/>
            <Route path='/LiveMenu/:slug' component={LiveMenu}/>
            <Route path='/Article/:slug' component={Article}/>
            <Route path='/Support' component={Article}/>
            <Route path='/Settings' component={Settings}/>
            <Route path='/Routes' component={Routes}/>
            {/*<Route path='/LiveMap/:slug' component={LiveMap}/>
            <Route path='/Sandbox' component={Sandbox}/>
            <Route path='/Sandbox2' component={Sandbox2}/>
            <Route path='/Sandbox3' component={Sandbox3}/>*/}
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            {renderFooterMenu(main_menu)}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App