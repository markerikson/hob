import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonList, IonItem, IonLabel, IonTitle, IonBackButton } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Menu } from '../models/Menu'

interface SubMenu {
  id: string,
  name: string,
  icon_url: string
}

interface FooterMenuProps extends RouteComponentProps<{
  id: string
}> {}

const LiveMenu: React.FC<FooterMenuProps> = ({match}) => {

  const [sub_menus, setMenus] = useState<SubMenu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/sub_menu-'+match.params.id+'.json')
      .then(res => res.json())
      .then(setMenus)
  }, [match.params.id])

  const [menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/full_menu-'+match.params.id+'.json')
      .then(res => res.json())
      .then(setMenu)
  }, [match.params.id])

  function renderTitle(menu: Menu[]) {
    console.log(menu)
  }

  function renderMenuTitles(menus: SubMenu[]) {
    return menus.map((r: SubMenu, index) => (
      <IonItem key={'list_'+index} href={r.id} disabled={false}>
        <img src={r.icon_url} alt={r.name.toString()} width='50px'/>
        <IonLabel>{r.name.toString()}</IonLabel>
      </IonItem>
    ))
  }

  return(    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          {renderTitle(menu)}
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
        {renderMenuTitles(sub_menus)}
      </IonList>
      </IonContent>
    </IonPage>
  )
}

export default LiveMenu
