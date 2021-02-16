import * as MyConst from '../../services/constants'


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
  icon: {
    url: string,
  },
  tag: string,
  app_hooks_translation?: {
    title_translation?: string,
    language_translation?: {
      tag: string
    }
  }
}


const Training: React.FC = () => {
  
  const [hook, setHook] = useState<HookInterface[]>([])
  useEffect(() => {
    fetch( MyConst.RestAPI + 'hooks?tag=training')
      .then(res => res.json())
      .then(setHook)
  }, [])

  function renderVerticalMenu(list: HookInterface[]) {
    return list.map((item:HookInterface, index) => (
      <IonItem key={index} routerLink="/article/SolidHull">
        <IonLabel>{item?.app_hooks_translation?.language_translation?.tag === 'es_es' && <IonLabel>{item.app_hooks_translation.title_translation}</IonLabel>}</IonLabel>
      </IonItem>
    ))
  }

  function renderConsole(list: HookInterface[]) {
    console.log(list)
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

export default Training