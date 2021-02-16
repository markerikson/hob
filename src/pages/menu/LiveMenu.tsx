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
} from '@ionic/react'
import * as MyConst from '../../services/constants'

const BoatTypes: React.FC = () => {

  const [hook, setHook] = useState({'childrens':[]})

  useEffect(() => {
    fetch( MyConst.RestAPI + 'hooks?tag=training')
      .then(res => res.json())
      .then(setHook)
  }, [])

  console.log(hook)

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BOAT TYPES</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/article/SolidHull">
            <IonLabel>SOLID HULL</IonLabel>
          </IonItem>
          <IonItem routerLink="/Inflatables">
            <IonLabel>INFLATABLES</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default BoatTypes