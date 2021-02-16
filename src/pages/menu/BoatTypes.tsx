import React from 'react'
import { IonContent, IonItem, IonLabel, IonList, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import * as MyConst from '../../services/constants'

const BoatTypes: React.FC = () => {
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