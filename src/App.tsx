import React from 'react'
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter,  } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'

// CSS required for Ionic components to work properly
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

// App Components
import LiveMenu from './components/LiveMenu'
import Article from './components/Article'

// App main pages
import Home from './pages/Home'
import LiveMap from './pages/LiveMap'

// Dumped data! ;)
import MainMenu from './dump/others/main_menu.json'

interface Menu {
  id: number,
  name: string,
  ionic_resource: string,
  icon_url: string,
  //children: SubMenu[]
}

interface SubMenu {
  id: number,
  name: string,
  ionic_resource: string,
  icon_url: string
}

const App: React.FC = () => {

  // Setting footer icons from LiveMenu file... Must be INSIDE for performance reasons, as each content :P
  function renderFooterMenu(list: Menu[]) {
    return list.map((r: Menu, index) => (
      <IonTabButton key={'footer_'+index} tab={r.name} href={'/'+r.ionic_resource+'/'+r.id} disabled={false}>
        <img src={r.icon_url} alt={r.name.toString()} />
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
            <Route path='/LiveMenu/:id' component={LiveMenu}/>
            <Route path='/LiveMap/:id' component={LiveMap}/>
            <Route path='/Article/:id' component={Article}/>
            <Route path='/Support' component={Article}/>
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            {renderFooterMenu(MainMenu)}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App