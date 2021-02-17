import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'

import * as MyConst from '../services/constants'

const Routes: React.FC = () => {

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>RouteName</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">The route</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="The route" />
      </IonContent>
    </IonPage>
  )

}

export default Routes
