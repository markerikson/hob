import * as MyConst from '../../services/constants'
import {  IonPage,  IonHeader,  IonContent,  IonToolbar,  IonList,  IonItem,  IonLabel,  IonTitle,  //IonButtons,  //IonBackButton,  //useIonViewWillEnter,  //useIonViewDidEnter,  //useIonViewDidLeave,  //useIonViewWillLeave,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, 
  //withRouter, useLocation 
} from 'react-router'
import axios from 'axios';

/* TODO: PUT SOMEWHERE THE COMPLETE EXTRACTED DATA FOR GET IT FROM IN APP AS INIT APP COMPLEXITY */ 
interface MenuInterface {
  id: number,
  name: string,
  icon: {
    url: string
  },
  label?: {
    label: string,
    language: {
      id: string,
      name: string,
      code: string
    }
  },
  ionic_resource: string,
  description: string,
  children?: {
    [key: string]: ChildrenInterface
  }
}

interface ChildrenInterface {
  contents?: ContentInterface[],
  menus?: SubmenuInterface[]  
}

interface SubmenuInterface {
  id: number,
  name: string,
  icon: {
    url: string
  },
  ionic_resource: string,
  description: string,
  children?: {
    [key: string]: ChildrenInterface
  }
}

interface ContentInterface {
  id: string,
  name: string,
  icon: {
    url: string
  },
  media?: {
    label: string,
    language: {
      id: string,
      name: string,
      code: string
    }
  }
}

interface FooterMenuProps extends RouteComponentProps<{
  id: string;
}> {}

const LiveMenu: React.FC<FooterMenuProps> = ({match}) => {
  
  const uri1 = 'http://161.97.167.92:1337/app-menus?id='+match.params.id;
  const [menu, setMenu] = useState<MenuInterface[]>([])

  useEffect(() => {
    fetch(uri1)
      .then(res => res.json())
      .then(setMenu)
  }, [])

  //console.log(menu)


  // Fetching the vertical menu
  function renderVerticalMenu(list: SubmenuInterface[]) {
    var res = list.map((r: SubmenuInterface, i) => (
      <IonItem key={'list_'+i}>
        <img src={ MyConst.RestStorage + r.icon.url } alt={r.name.toString()} width="50px"/>
        <IonLabel>{r.name}</IonLabel>
      </IonItem>
    ))
    return res
  }

  function renderTitle(list: MenuInterface[]) {
    return list.map((p, index) => (<IonTitle key={index}>{p.name.toString()}</IonTitle>))
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/*<IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>*/}
          {renderTitle(menu)}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {renderVerticalMenu(menu)}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default LiveMenu
