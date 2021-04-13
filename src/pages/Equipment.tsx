import * as MyConst from '../static/constants'
import React, { useEffect, useState } from 'react'
import {  IonContent,  IonHeader,  IonPage,  IonTitle,  IonToolbar} from '@ionic/react'

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from 'jquery'

// Models for the route
import { Menu } from '../models/Menu'

const LiveMap: React.FC =  () => {

  const [full_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.menuDump + 'explore-and-equip.json').then(res => res.json()).then(setMenu)
  }, [])
  
  renderMenuTitle(full_menu)

  function renderMenuTitle(menus: Menu[]) {
    if(menus[0]!== undefined){
      let location = 'explore-and-equip'
      console.log(location, menus[0].slug)
      if( menus[0].slug === location){
        jQuery('#'+menus[0].slug).attr('src',menus[0].active_icon)
      }else{
        jQuery('#'+menus[0].slug).attr('src',menus[0].inactive_icon)
      }      
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Route - Route title</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  )

}

export default LiveMap;