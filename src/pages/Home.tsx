import React, { useEffect, useState } from 'react'
import {
  IonPage, 
  IonContent, 
  IonTabButton,
  IonList,
} from '@ionic/react'
import { RouteComponentProps } from 'react-router'

// Translations...
import { useTranslation } from 'react-i18next'

// Models...
import { Menu } from '../models/Menu'
//import { Submenu } from '../models/Submenu'

interface HomeProps extends RouteComponentProps<{
  slug: string
}> {}

const Home: React.FC<HomeProps> = ({match}) => {

  const {t} = useTranslation()

  const [main_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/main-menu.json').then(res => res.json()).then(setMenu)
  }, [])

  function renderHomeMenu(list: Menu[]) {    
    return list.map((r: Menu, index) => (
      <IonTabButton
        class='hob-footer'
        key={r.access}
        tab={r.access}
        href={r.access}
        disabled={false}
      >{/*TODO: Set inactive by location!! ->> */}
        <img 
          src={true ? r.active_icon : r.inactive_icon} 
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
          {renderHomeMenu(main_menu)}
        </IonList>
      </IonContent>
    </IonPage>
  )

}

export default Home