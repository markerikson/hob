import * as MyConst from '../static/constants'
import React, { useEffect, useState } from 'react'
import {
  IonPage, 
  IonContent, 
  IonTabButton,
  IonList,
  IonRouterOutlet, IonTabBar, IonTabs 
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { RouteComponentProps } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
import LiveMenu   from './LiveMenu'
// Translations...
import { useTranslation } from 'react-i18next'

// Models...
import { Menu } from '../models/Menu'

interface HomeProps extends RouteComponentProps<{
  slug: string
}> {}

const Home: React.FC<HomeProps> = ({match}) => {

  const {t} = useTranslation()

  const [mainMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.mainMenu).then(res => res.json()).then(setMenu)
  }, [])

  function renderHomeMenu(list: Menu[]) {
    //var lineHeightPer = 100 / list.length
    return list.map((r: Menu, index) => (
      <IonTabButton
        key={r.access}
        tab={r.access}
        href={r.access}
        disabled={false}
        class='hob_home_button'
      >{/*TODO: Set inactive_icon when not in the location!! ->> */}
        <img 
          src={r.active_icon} 
          alt={t(r.name.toString())}
          width='60%' height='120px'
        />{t(r.name.toString())}
      </IonTabButton>
    ))
  }

  return(    
    <IonPage>
      <IonContent>
        <IonList>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>      
                <Route path='/LiveMenu/:slug' component={LiveMenu}/>      
                <Route path='/LiveMenu' render={() => <Redirect to='/LiveMenu/train-yourself'/>} exact={true}/>  
              </IonRouterOutlet>          
              <IonTabBar slot='bottom' class='hob-footer'>
                {renderHomeMenu(mainMenu)}
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
          <IonTabBar slot='bottom' class='hob-footer'>
            {renderHomeMenu(mainMenu)}
          </IonTabBar>
        </IonList>
      </IonContent>
    </IonPage>
  )

}

export default Home