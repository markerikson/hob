import React, { useEffect, useState } from 'react'
import { IonPage, 
  IonHeader, 
  IonContent, 
  IonToolbar,
  IonList,
  IonItem, 
  IonThumbnail, 
  IonLabel, 
  IonImg, 
  IonButton,
  //IonBackButton,
  //IonSearchbar, 
  //IonTitle, 
} from '@ionic/react'
import { RouteComponentProps } from 'react-router'

// Translations...
import { useTranslation } from 'react-i18next'

// Models...
import { Menu } from '../models/Menu'
import { Submenu } from '../models/Submenu'

interface FooterMenuProps extends RouteComponentProps<{
  slug: string
}> {}

const LiveMenu: React.FC<FooterMenuProps> = ({match}) => {

  const {t} = useTranslation()

  const [full_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/menu-'+match.params.slug+'.json').then(res => res.json()).then(setMenu)
  }, [match.params.slug])

  const [sub_menus, setMenus] = useState<Submenu[]>([])
  useEffect(() => {
    fetch('assets/dump/menus/sub-menu-'+match.params.slug+'.json').then(res => res.json()).then(setMenus)
  }, [match.params.slug])
  
  function renderSubMenus(menus: Submenu[]) {
    return menus.map(
      (r: Submenu, index) => (
        r.active_icon
        ? <IonItem key={r.resource} href={r.resource} disabled={false} class='xc ion-margin-vertical'>
            <img src={r.active_icon} alt='' width='23%' height='auto' max-height='250px'/><br/>
            <IonLabel>{t(r.name.toString())}</IonLabel>
          </IonItem>
        : <IonButton key={r.resource} color={r.background_color} href={r.resource} expand='block'>{t(r.name.toString())}</IonButton>
      )
    )
  }

  function renderMenuTitle(menus: Menu[]) {
    return menus.map((r: Menu, i) => (
      <IonItem class='hob-header border-none' key={i}>
        <a href={r.parent}><IonImg src='/assets/images/arrow-left.svg' slot='start'></IonImg></a>
        <IonThumbnail>      
          <IonImg src={r.active_icon} alt={''}/>
        </IonThumbnail>
        <IonLabel>{t(r.name.toString())}</IonLabel>
        {/*<IonSearchbar placeholder='Type here...' value={search} showCancelButton='focus'></IonSearchbar>*/}
      </IonItem>
    ))
  }

  return(    
    <IonPage>
      <IonHeader class='hob-header'>
        <IonToolbar class='hob-header'>                           
          {renderMenuTitle(full_menu)}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {renderSubMenus(sub_menus)}
        </IonList>
        {/*<IonButton color="primary">Primary</IonButton>
        <IonButton color="secondary">Secondary</IonButton>
        <IonButton color="tertiary">Tertiary</IonButton>
        <IonButton color="success">Success</IonButton>
        <IonButton color="warning">Warning</IonButton>
        <IonButton color="danger">Danger</IonButton>
        <IonButton color="light">Light</IonButton>
        <IonButton color="medium">Medium</IonButton>
        <IonButton color="dark">Dark</IonButton>

        <IonButton expand="full">Full Button</IonButton>
        <IonButton expand="block">Block Button</IonButton>

        <IonButton shape="round">Round Button</IonButton>

        <IonButton expand="full" fill="outline">Outline + Full</IonButton>
        <IonButton expand="block" fill="outline">Outline + Block</IonButton>
        <IonButton shape="round" fill="outline">Outline + Round</IonButton>

        <IonButton>
          Left Icon
        </IonButton>

        <IonButton>
          Right Icon
        </IonButton>

        <IonButton size="large">Large</IonButton>
        <IonButton>Default</IonButton>
        <IonButton size="small">Small</IonButton>*/}
      </IonContent>
    </IonPage>
  )

}

export default LiveMenu