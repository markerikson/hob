import React, { useEffect, useState } from 'react'
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter,  } from '@ionic/react-router'
import { Menu } from '../models/Menu'
import { useTranslation } from 'react-i18next'

const FooterMenu = () => {

  const {t} = useTranslation()
  const [mainMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/others/main-menu.json').then(res => res.json()).then(setMenu)
  }, [])

  return ( 
  <IonTabBar slot='bottom'>
    {mainMenu.map((r: Menu, index) => (
      <IonTabButton key={r.resource} tab={r.name} href={r.resource} disabled={false}>
        <img src={r.active_icon} alt={t(r.name.toString())} />
      </IonTabButton>
    ))}</IonTabBar>
  )

}

export default FooterMenu