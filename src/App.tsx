import * as Const from './services/constants'

import React, { useEffect, useState } from 'react'
import { IonReactRouter,  } from '@ionic/react-router'

import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar,   useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave, IonTabButton, IonTabs } from '@ionic/react'
import { triangle } from 'ionicons/icons'
import { Redirect, Route } from 'react-router-dom'
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
import Home         from './pages/menu/Home'
import Training     from './pages/menu/Training'
import ExploreEquip from './pages/menu/ExploreEquip'
import Navigate     from './pages/menu/Navigate'
import Assistance   from './pages/menu/Assistance'
import LiveMenu     from './pages/menu/LiveMenu'
/*import Routes       from './pages/menu/Routes'
import LiveMap      from './pages/menu/LiveMap'
import Route1        from './pages/menu/Route1'
import BoatTypes        from './pages/menu/BoatTypes'*/
//import RedirectToLogin from './components/RedirectToLogin';

import { loadConfData } from './data/sessions/sessions.actions';
import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions';

/*const routes = {
  appPages: [
    { name: 'Home',             path: '/Home',          icon: square    },
    { name: 'Train yourself',   path: '/Training',      icon: square    },
    { name: 'Explore & Equip',  path: '/ExploreEquip',  icon: triangle  },
    { name: 'Navigate',         path: '/Navigate',      icon: images    },
    { name: 'Assistance',       path: '/Assistance',    icon: language  }
  ]
}*/

interface FooterMenu {
  name: string,
  path: string,
  icon: {
    url: string,
  },
  tag: string,
  app_hooks_translation: {
    title_translation: string,
    language_translation: {
      tag: string
    }
  }
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

const App: React.FC = () => {

  const [hooks, setHooks] = useState<any[]>([])

  useIonViewDidEnter(() => {
    console.log('APP ionViewDidEnter event fired');
  });

  useIonViewDidLeave(() => {
    console.log('APP ionViewDidLeave event fired');
  });

  useIonViewWillEnter(() => {
    console.log('APP ionViewWillEnter event fired');
  });

  useIonViewWillLeave(() => {
    console.log('APP ionViewWillLeave event fired');
  });

  function renderFooterMenu(list: FooterMenu[]) {
    /*var list2
    list.forEach( function(valor1, indice, array) {
        var ter = valor1.app_hooks_translation.map( function(valor, indice, array) {
          return valor.title_translation
        })
        alert(ter)
    })

    //alert(JSON.stringify(list2))
*/
    var r = list
      .filter(route => !!route.path)
      .map(p => (
        <IonTabButton tab={p.path+p.tag} href={p.path}>
          <img src={Const.PHOTO_STORAGE + p.icon.url} alt="Ionic logo" />
          <IonLabel>{p.name}</IonLabel>
        </IonTabButton>
      )
    )
    //renderConsole(hooks)
    return r
  }


  function renderConsole(list: FooterMenu[]) {
    console.log(list[0])
  }
  
  useEffect(() => {
    fetch( Const.RestAPI + 'hooks?style=main')
    .then(res => res.json())
    .then(setHooks)
  }, [])
  
  //renderConsole(hooks)

  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path='/Home' component={Home}/>
            <Route path='/Training' component={Training}/>
            <Route path='/ExploreEquip' component={ExploreEquip}/>
            <Route path='/Navigate' component={Navigate}/>
            <Route path='/Assistance' component={Assistance}/>
            <Route path='/LiveMenu/:tag' component={LiveMenu}/>
            <Route path='/' render={() => <Redirect to='/Home'/>} exact={true}/>
            {/*<Route path="/logout" render={() => {
              return <RedirectToLogin
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
              />;
            }} />*/}        
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