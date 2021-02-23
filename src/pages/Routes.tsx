import * as MyConst from '../services/constants'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, 
  //withRouter, useLocation 
} from 'react-router'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'

interface RouteInterface {
  id:number,
  name:string,
  data:string,
  center_lat:number,
  center_long:number
}

interface MapProps extends RouteComponentProps<{
  id: string;
}> {}

const Routes: React.FC<MapProps> = ({match}) => {

  const [routes, setRoute] = useState<RouteInterface[]>([])
  useEffect(() => {
    fetch('http://161.97.167.92:1337/my-routes')
      .then(res => res.json())
      .then(setRoute)
  }, [match.params.id])

  console.log(routes)  

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
