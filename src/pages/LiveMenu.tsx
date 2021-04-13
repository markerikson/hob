import * as MyConst from '../static/constants'
import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonImg, IonLabel, IonButton, IonThumbnail } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from 'jquery'

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
    fetch(MyConst.menuDump + match.params.slug + '.json').then(res => res.json()).then(setMenu)
  }, [match.params.slug])

  const [sub_menus, setMenus] = useState<Submenu[]>([])
  useEffect(() => {
    fetch(MyConst.subMenuDump + match.params.slug + '.json').then(res => res.json()).then(setMenus)
  }, [match.params.slug])
  
  function renderSubMenus(menus: Submenu[]) {
    return menus.map((r: Submenu, index) => (
      ! r.active_icon
      ? <IonButton key={r.resource} color={r.background_color} href={r.resource} expand='block'>{t(r.name)}</IonButton>
      : <IonItem key={r.resource} href={r.resource} disabled={false} class='xc ion-margin-vertical'>
          <img src={r.active_icon} alt='' width='26%' height='auto' max-height='250px'/><br/>
          <IonLabel>{t(r.name)}</IonLabel>
        </IonItem>
    ))
  }

  function renderMenuTitle(menus: Menu[]) {
           
    if(menus[0]!== undefined){
      console.log(window.location.pathname.split('/'))
      let location = window.location.pathname.split('/') ?? null
      if( menus[0].slug === location[2]){
        jQuery('#'+menus[0].slug).attr('src',menus[0].active_icon)
      }else{
        jQuery('#'+menus[0].slug).attr('src',menus[0].inactive_icon)
      }      
    }

    return menus.map((r: Menu, i) => (
      r.has_main && r.slug === 'train-yourself'
      ? <a href={r.parent}>
          <IonImg class='hob_head_back' src={MyConst.icons.back} slot='start'></IonImg>
        </a>
      : <IonHeader class='hob-header'>
          <IonToolbar class='hob-header'> 
            <IonItem class='hob-header border-none' key={i}>
              <a href={r.parent}><IonImg src={MyConst.icons.back} slot='start'></IonImg></a>
              <IonThumbnail>      
                <IonImg src={r.active_icon} alt={''}/>
              </IonThumbnail>
              <IonLabel>{t(r.name)}</IonLabel>
            {/*<IonSearchbar placeholder='Type here...' value={search} showCancelButton='focus'></IonSearchbar>*/}
            </IonItem>         
          </IonToolbar>
        </IonHeader>
      
    ))
  }

  return(    
    <IonPage>                                
      {renderMenuTitle(full_menu)}
      <IonContent>
        <IonList>
          {renderSubMenus(sub_menus)}
        </IonList>
      </IonContent>
    </IonPage>
  )

}

export default LiveMenu