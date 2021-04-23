import * as MyConst from '../static/constants'
import React, { useEffect, useState } from 'react'
import {  IonContent,  IonHeader,  IonPage,  IonTitle,  IonToolbar} from '@ionic/react'

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from 'jquery'

// Models for the route
import { Menu } from '../models/Menu'

const LiveMap: React.FC =  () => {

  // TODO: Change with the common React way to do this!!!
  const [full_menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.menuDump + 'explore-and-equip.json').then(res => res.json()).then(setMenu)
  }, [])  
  hoverFooterIcon(full_menu)
  function hoverFooterIcon(menus: Menu[]) {
    if(menus[0]!== undefined){
      let location = 'explore-and-equip'
      if( menus[0].slug === location){
        jQuery('#'+menus[0].slug).attr('src',menus[0].active_icon)
      }else{
        jQuery('#'+menus[0].slug).attr('src',menus[0].inactive_icon)
      }      
    }
  }
  // TODO: Change with the common React way to do this!!!

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