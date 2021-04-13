import * as MyConst from '../src/static/constants'
import React, { useEffect, useState } from 'react'
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'

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

// TODO: feature harder; now is only app backoffice, not accesible ;)
import Settings   from './pages/Settings'
//import About       from './pages/About'

// Featured login, only registered users!! (FUTURE!)
// // import Login       from './pages/Login' 

// Show the splash for 4 seconds and then auto hide:
const { SplashScreen } = Plugins
SplashScreen.show(MyConst.splashScreen)

const App: React.FC = () => {

  const [main_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/main-menu.json').then(res => res.json()).then(setMenu)
  }, [])

  function renderFooterMenu(list: Menu[]) {
    return <IonTabBar slot='bottom' class='hob-footer'>
      {list.map((r: Menu, index) => (
        <IonTabButton class='hob-footer' key={r.resource} tab={r.slug} href={r.resource} disabled={false}>
          <img 
            id={r.slug}
            className='footer_button'
            src={r.inactive_icon} 
            alt={r.name}
            width='60%'
            max-height='120px'
          />
        </IonTabButton>
      ))}
    </IonTabBar>
  }

  let location2 = window.location.pathname.split('/')[1] ?? null
console.log(location2)
  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>            
            <Route path='/' render={() => <Redirect to='/Home'/>} exact={true}/>            
            <Route path='/Home' component={Home}/>
            <Route path='/Access/:slug' component={Access}/>
            <Route path='/LiveMenu/:parent/:slug' component={LiveMenu}/>
            <Route path='/Article/:slug/:slide/:step' component={Article}/>
            <Route path='/Equipment/:slug' component={Equipment}/>
            <Route path='/Routes/:owner_id' component={Routes}/>
            <Route path='/Navigation' component={Navigation}/>
            <Route path='/LiveMap/:id' component={LiveMap}/>
            <Route path='/Settings' component={Settings}/>
          </IonRouterOutlet>          
          {location2 !=='Home' && location2 !=='Settings' 
            ? renderFooterMenu(main_menu)
            : <IonTabBar slot='bottom' class='hob-footer hidden'></IonTabBar>
          }
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )

}

export default App