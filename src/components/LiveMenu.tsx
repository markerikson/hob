import * as MyConst from '../services/constants'
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonList, IonItem, IonLabel, IonTitle, IonBackButton } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useLocation } from 'react-router-dom';

// Data Interfaces
import { Menu } from '../models/Menu'

interface FooterMenuProps extends RouteComponentProps<{
  id: string
}> {}

const LiveMenu: React.FC<FooterMenuProps> = ({match}) => {

  const location = useLocation();
  const [menu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch('http://161.97.167.92:1337/app-menus?id='+match.params.id)/*2 is a nice one!!*/
      .then(res => res.json())
      .then(setMenu)
  }, [match.params.id])
  //console.log(menu)
  
  // Fetching the vertical menu
  function renderVerticalMenu(list: Menu[]) {/*MAIN TODO JEFF!!!! En realidad tendrían que ser submenús... Estos no incluyen */
    var res = list.map((r: Menu, i) => (
      <IonItem key={'list_'+i} className={location.pathname === r.ionic_resource ? 'selected' : ''} >
        {/* MyConst.DefaultLanguage == es_es the paint label*/}
        <img src={ MyConst.RestStorage + r.icon.url } alt={r.name.toString()} width="50px"/>
        <IonLabel>{r.name}</IonLabel>{/*MAIN TODO JEFF!!!! Aquí lo que quiero es imprimir la primera fila del Array children, tanto los que son contents como menus */}
      </IonItem>
    ))
    return res
  }

  function renderTitle(list: Menu[]) {
    return list.map((p, index) => (<IonTitle key={index}>{p.name.toString()}</IonTitle>))
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
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
