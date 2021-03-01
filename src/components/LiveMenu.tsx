import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonList, IonItem, IonThumbnail, IonLabel, IonImg, IonSearchbar, IonTitle, IonBackButton } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

// Models...
import { Menu } from '../models/Menu'
import { Submenu } from '../models/Submenu'

interface FooterMenuProps extends RouteComponentProps<{
  slug: string
}> {}

const LiveMenu: React.FC<FooterMenuProps> = ({match}) => {

  const [sub_menus, setMenus] = useState<Submenu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/sub-menu-'+match.params.slug+'.json')
      .then(res => res.json()).then(setMenus)
  }, [match.params.slug])

  const [full_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/full-menu-'+match.params.slug+'.json')
      .then(res => res.json()).then(setMenu)
  }, [match.params.slug])

  function renderSubMenus(menus: Submenu[]) {
    return menus.map((r: Submenu, index) => (
      <IonItem key={r.resource} href={r.resource} disabled={false}>
        <img src={r.icon_url} alt={r.name.toString()} width='50px'/>
        <IonLabel>{r.name.toString()}</IonLabel>
      </IonItem>
    ))
  }

  function renderMenuTitle(menus: Menu[]) {
    return menus.map((r: Menu, i) => (
      <IonItem key={i}>
        <IonThumbnail slot="start">
          <IonImg src={r.icon_url} alt={r.name.toString()}/>
        </IonThumbnail>
        <IonLabel>{r.name.toString()}</IonLabel>
        <IonSearchbar value={'test'} showCancelButton="focus"></IonSearchbar>
      </IonItem>
    ))
  }

  function renderBackButton(menus: Menu[]) {
    return menus.map((r: Submenu, index) => (
      <IonButtons key={r.resource.toString()} slot="start">
        <IonBackButton defaultHref={'/'} />
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
