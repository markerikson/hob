import * as MyConst from '../src/static/constants'
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  //useIonViewWillEnter,
} from '@ionic/react'
//import { useHistory } from "react-router"
import React, { useEffect, useState } from 'react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import './components/i18n'
//import axios from 'axios'
//import { Plugins } from '@capacitor/core'
//import jQuery from "jquery"

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
import Access         from './pages/Access'// Login
import LiveMenu       from './pages/LiveMenu'
import Article        from './pages/Article'
import Routes         from './pages/Routes'
import LiveMap        from './pages/LiveMap'
import Equipment      from './pages/Equipment'
import RouteOverview  from './pages/RouteOverview'

//TESTS
import Segment  from './pages/test/Segment'


/*
var SplashOnce = localStorage.getItem('SplashOnce!!')
if(SplashOnce !== ''){
  const { SplashScreen } = Plugins
  SplashScreen.show(MyConst.splashScreen)
  localStorage.setItem('SplashOnce!!', 'true')  
}
*/

const App: React.FC = () => {

  var creator_id = localStorage.getItem('creator:id')
  /* 
  const history = useHistory();

  // Auto connect to the text user 
  const accesClientData = async (e: any) => {
    creator_id = localStorage.getItem('creator:id')
    var user = localStorage.getItem('user')
    var password = localStorage.getItem('password')
    console.log('Auto Login!!!')
    if(creator_id !== ''){
      const { data } = await axios.post(MyConst.RestAPI+'auth/local', {
        identifier: user,
        password:   password,
      })
      if(data.user !== undefined){
        localStorage.setItem('creator:id', data.user.creator.toString())
        localStorage.setItem('creator:contact_number', data.user.contact_number)
        localStorage.setItem('creator::assistance_number', '061')
        localStorage.setItem('creator:data', JSON.stringify(data.user))
        history.replace("/LiveMenu/home")
      }
    }
  }

  var user = localStorage.getItem('user')
  var password = localStorage.getItem('password')  
  if((user !== undefined && password !== undefined) || creator_id === '' ){
    console.log(accesClientData)
  }
  */

  const [mainMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.mainMenu).then(res => res.json()).then(setMenu)
  }, [])

  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path='/' render={() => <Redirect to={ creator_id ? '/LiveMenu/home' : '/Access'}/>} exact={true}/>         
            <Route path='/Home' render={() => <Redirect to={MyConst.homeHref}/>} exact={true}/>         
            <Route path='/Access' component={Access}/>
            <Route path='/Access/:user/:password' component={Access}/>
            <Route path='/LiveMenu/:slug' component={LiveMenu}/>            
            <Route path='/LiveMap' render={() => <Redirect to='/LiveMap/navigate' />} exact={true}/>
            <Route path='/LiveMap/navigate' component={LiveMap}/>
            <Route path='/LiveMap/navigate/:slug' component={LiveMap}/>
            <Route path='/Article/:slug/:slide/:step' component={Article}/>            
            <Route path='/Equipment' component={Equipment}/>
            <Route path='/Route/Overview/:route/:step' component={RouteOverview}/>
            <Route path='/Routes' component={Routes}/>
            <Route path='/Segment' component={Segment}/>
          </IonRouterOutlet>          
          <IonTabBar
            slot='bottom'
            class='footer_tab'>
            {mainMenu.map((r: Menu) => (
              <IonTabButton
                key={r.resource+'_footer'}
                tab={r.slug}
                href={r.resource}
                disabled={false}
                class=''>
                <img 
                  id={'button-'+r.slug}
                  alt={r.name}
                  src={r.inactive_icon}
                  data-active={r.active_icon}
                  data-inactive={r.inactive_icon}
                  className='footer_tab_button'
                />
              </IonTabButton>
            ))}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )

}

export default App