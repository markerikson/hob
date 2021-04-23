import * as MyConst from '../src/static/constants'
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
//import axios from 'axios'

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

// Static
//import { appClient } from './static/appClient'

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

  // Temporary ninja acces control
  var creator_id = localStorage.getItem('creator::id')
  if(MyConst.menuSettings.freeAccess.indexOf(window.location.pathname) !== -1){
    console.log('You have free access here!! :)')  
  }else{
    if( creator_id !== '' ){
      console.log('Hello you have granted access, '+creator_id)
    }else{
      alert("You don't have acces to this area...")
      window.location.href = '/Access/train-yourself'
    }
  }

  const [main_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/main-menu.json').then(res => res.json()).then(setMenu)
  }, [])

  // TODO: Move to component when migrate all project to cleanest possible one
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

  // Access to the platform for verify the app .env's and in the future 
  /*
  function appLogin() {
    if(MyConst.corsSetted && !MyConst.JustTesting){
      // TODO: SET CORS ON SERVER!!!
      // TODO: Move to awaitable place!!!
      //const { data } = await axios.post(MyConst.RestAPI+'auth/local', {
      //  identifier: MyConst.appUserEmail,
      //  password:   MyConst.appPass,
      //})
      return appClient
    }else{
      return appClient
    }
  }  
  console.log(appLogin())
  

  console.log(window.location.pathname)
*/
  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>   
            <Route path='/' render={() => <Redirect to='/LiveMenu/home'/>} exact={true}/>         
            <Route path='/Home' render={() => <Redirect to='/LiveMenu/home'/>} exact={true}/>           
            <Route path='/Access' component={Access}/>
            <Route path='/LiveMenu/navigate' component={LiveMap}/>

            <Route path='/LiveMenu' render={() => <Redirect to='/LiveMenu/home'/>} exact={true}/>  
            <Route path='/LiveMenu/:slug' component={LiveMenu}/>
            <Route path='/Article/:slug/:slide/:step' component={Article}/>
            <Route path='/Equipment/:slug' component={Equipment}/>
            <Route path='/Routes' component={Routes}/>
            <Route path='/Navigation' component={Navigation}/>
            <Route path='/LiveMap/:slug/:id' component={LiveMap}/>
            <Route path='/Settings' component={Settings}/>
            {/*<Route path='/Access/:slug' component={Access}/>*/}
          </IonRouterOutlet>          
          { MyConst.menuSettings.hiddenFooter.indexOf(window.location.pathname) === -1
            ? renderFooterMenu(main_menu)
            : <IonTabBar slot='bottom' class='hob-footer hidden'></IonTabBar>
          }
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )

}

export default App