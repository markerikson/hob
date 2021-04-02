//import * as MyConst from '../static/constants'

import React
//,{ useEffect, useState }
from 'react'

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'

const LiveMap: React.FC =  () => {

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