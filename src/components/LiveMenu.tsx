import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonList, IonItem, IonThumbnail, IonLabel, IonImg, IonSearchbar, IonTitle, IonBackButton } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

// Translations...
import './i18n'
import { useTranslation } from 'react-i18next'

// Models...
import { Menu } from '../models/Menu'
import { Submenu } from '../models/Submenu'

interface FooterMenuProps extends RouteComponentProps<{
  slug: string;
}> {}

const LiveMenu: React.FC<FooterMenuProps> = ({match}) => {
  
  // Data captures...
  const [full_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/full-menu-'+match.params.slug+'.json').then(res => res.json()).then(setMenu)
  }, [match.params.slug])
  
  const [sub_menus, setMenus] = useState<Submenu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/sub-menu-'+match.params.slug+'.json').then(res => res.json()).then(setMenus)
  }, [match.params.slug])
  
  // Translations
  const { t, i18n } = useTranslation()

  function renderSubMenus(menus: Submenu[]) {
    return menus.map((r: Submenu, index) => (
      <IonItem key={r.resource} href={r.resource} disabled={false}>
        <img src={r.icon_url} alt={t(r.name.toString())} width='50px'/>
        <IonLabel>{t(r.name.toString())}</IonLabel>
      </IonItem>
    ))
  }

  function renderMenuTitle(menus: Menu[]) {
    return menus.map((r: Menu, i) => (
      <IonItem key={i}>
        <IonThumbnail slot='start'>
          <IonImg src={r.icon_url} alt={t(r.name.toString())}/>
        </IonThumbnail>
        <IonLabel>{t(r.name.toString())}</IonLabel>
        {/*<IonSearchbar value={'test'} showCancelButton='focus'></IonSearchbar>*/}
      </IonItem>
    ))
  }

  function renderBackButton(menus: Menu[]) {
    return menus.map((r: Menu, index) => (
      <IonButtons key={r.resource.toString()} slot='start'>
        <IonBackButton defaultHref={r.parent.toString()} />
      </IonButtons>
    ))
  }

  return(

    <IonPage>
      <IonHeader>
        <IonToolbar>
          {renderBackButton(full_menu)}
          {renderMenuTitle(full_menu)}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {renderSubMenus(sub_menus)}
        </IonList>
      </IonContent>
    </IonPage>

  )

}

export default LiveMenu