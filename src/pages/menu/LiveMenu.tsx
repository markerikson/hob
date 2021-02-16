import * as MyConst from '../../services/constants'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter, useLocation } from 'react-router'
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
  icon: Icon,
  tag: string,
  childrens?: HookInterface,
  app_hooks_translation?: Translations
}
interface Translations {
  title_translation?: string,
  language_translation?: {
    tag: string
  }
}
interface Icon {
  url: string
}
interface FooterMenuProps extends RouteComponentProps<{
  tag: string;
}> {}

const LiveMenu: React.FC<FooterMenuProps> = ({match}) => {
  
  const [hook, setHook] = useState<HookInterface[]>([])
  useEffect(() => {
    //MyConst.RestAPI + 'hooks?style=main&tag='+match.params.tag)
    fetch('http://161.97.167.92:1337/hooks?style=main&tag=Training')
      .then(res => res.json())
      .then(setHook)
  }, [])

  // Fetching the 
  function renderVerticalMenu(list: HookInterface[]) {
    return list.map((p:HookInterface, index) => (
      <IonItem key={index} routerLink={p.path.toString()}>
        <IonLabel>{p.name.toString()}</IonLabel>
      </IonItem>
    ))
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
          {renderVerticalMenu(hook)}{/*TODO: Fetch hook.childrens*/}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default LiveMenu
