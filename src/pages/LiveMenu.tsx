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
  parent: string
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
    //var lineHeightPer = 100 / menus.length
    return menus.map((r: Submenu, index) => (
      ! r.active_icon
      ? <IonButton key={r.resource} color={r.background_color} href={r.resource} expand='block'>{t(r.name)}</IonButton>
      : <IonItem key={r.resource} href={r.resource} disabled={false} class='xc ion-margin-vertical'>
          <img src={r.active_icon} alt='' width='26%' height='auto' max-height='250px'/><br/>
          <IonLabel>{t(r.name)}</IonLabel>
        </IonItem>
    ))
  }

  function renderMenuTitle(menu: Menu[]) {

    let location2 = window.location.pathname.split('/')[2] ?? null
    let location3 = window.location.pathname.split('/')[3] ?? null
    if(menu[0]!== undefined){
      if( menu[0].section === location2 ||  menu[0].slug === location2){
        console.log('2:'+menu[0].slug+' === '+location2+' || '+location3)
        jQuery('#'+menu[0].slug).attr('src',menu[0].active_icon)
      }else{
        jQuery('.'+menu[0].slug).attr('src',menu[0].inactive_icon)
      }
      if( menu[0].section === location3){
        console.log('1:'+menu[0].slug+' === '+location3)
        jQuery('#'+menu[0].slug).attr('src',menu[0].active_icon)
      }else{
        jQuery('#'+menu[0].slug).attr('src',menu[0].inactive_icon)
      }
      
    }

    return menu.map((r: Menu, i) => (
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