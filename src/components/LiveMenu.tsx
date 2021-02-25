//import * as MyConst from '../services/constants'
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonList, IonItem, IonLabel, IonTitle, IonBackButton } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
// Importing language and menu dumped data...
//import AllMenus from '../data/dump/others/all_menus.json'

// Data Interfaces
//import { Menu } from '../models/Menu'

interface Menu {
  id: number,
  name: string,
  ionic_resource: string,
  main: boolean,
  background_color: string,
  icon_url: string
}

interface FooterMenuProps extends RouteComponentProps<{
  id: string
}> {}

const LiveMenu: React.FC<FooterMenuProps> = ({match}) => {
 
  function readJsonData(){    
    fetch('../data/dump/menus/menu-'+match.params.id+'.json')
      .then(res=>res.json()).then(json=>{
        console.log("OUTPUT: ");
        //DO YOUR STAFF
    });
  }

  readJsonData();
  
  function renderTitle(menu: Menu) {
    return <IonTitle key={'jhg'}>{menu.name}</IonTitle>
  }

  return(    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          {/*renderTitle(data)*/}
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  )
}

export default LiveMenu
