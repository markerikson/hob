import * as MyConst from '../static/constants'

import React, { useEffect, useState } from 'react'

import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonList,
  IonItem,
  IonTitle,
  IonLabel,
  //useIonViewWillEnter,
  //useIonViewDidEnter,
  //useIonViewDidLeave,
  //useIonViewWillLeave,
} from '@ionic/react'

interface HookInterface {
  name: string,
  path: string,
  icon: object,
  tag: string,
  childrens: object,/*,
  app_hooks_translation: {
    title_translation: string,
    language_translation: {
      tag: string
    }
  }*/
}


const Weather: React.FC = () => {
  
  const [hook, setHook] = useState<HookInterface[]>([])
  useEffect(() => {
    fetch( MyConst.RestAPI + 'hooks?tag=training')
      .then(res => res.json())
      .then(setHook)
  }, [])

  function renderVerticalMenu(list: HookInterface[]) {
    const menus = [
      {
        name: 'Solid hull',
        path: '/article/SolidHull',
        tag: '',
        childrens: '{}'
      },{
        name: 'Inflatable',
        path: '/article/Inflatable',
        tag: '',
        childrens: '{}'
      }
    ]
    return menus.map( (p, index) => (
        <IonItem key={index} routerLink="/article/SolidHull">
          <IonLabel>{p.name}</IonLabel>
        </IonItem>
      )
    )    
  }

  function renderTitle(list: HookInterface[]) {
    return list.map((p, index) => (<IonTitle key={index}>{p.name.toString()}</IonTitle>))
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {renderTitle(hook)}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {renderVerticalMenu(hook)}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Weather