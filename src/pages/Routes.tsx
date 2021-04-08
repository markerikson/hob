import React
  //, { useEffect, useState } 
from 'react'
import { RouteComponentProps, 
  //withRouter, useLocation 
} from 'react-router'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
//import ExploreContainer from '../components/ExploreContainer'

/*interface RouteInterface {
  id: number,
  name: string,
  data: string,
  center_lat: number,
  center_long: number
}*/

interface MapProps extends RouteComponentProps<{
  id: string;
}> {}

const Routes: React.FC<MapProps> = ({match}) => {

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>RouteName</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>The route</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*<ExploreContainer name="The route" />*/}
      </IonContent>
    </IonPage>
  )

}

export default Routes