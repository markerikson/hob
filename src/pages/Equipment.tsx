import * as MyConst from '../static/constants'
import React, { useEffect, useState } from 'react'
import {  IonContent,  IonHeader,  IonPage, IonItem, IonGrid, IonRow, IonCol, IonImg, IonThumbnail, IonLabel, IonToolbar} from '@ionic/react'
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from 'jquery'

// Models for the route
import { Menu } from '../models/Menu'
import { Equipment } from '../models/Equipment'

const LiveMap: React.FC =  () => {

  const {t} = useTranslation()
  const history = useHistory();
  var lang = localStorage.getItem("i18nextLng")

  jQuery('#button-train-yourself').attr('src', jQuery('#button-train-yourself').data('inactive')) 
  jQuery('#button-explore-and-equip').attr('src', jQuery('#button-explore-and-equip').data('active')) 
  jQuery('#button-navigate').attr('src', jQuery('#button-navigate').data('inactive')) 
  jQuery('#button-assistance').attr('src', jQuery('#button-assistance').data('inactive')) 


  const [fullMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.menuDump + 'explore-and-equip.json').then(res => res.json()).then(setMenu)
  }, [])  

  function renderHeader(fullMenu: Menu[]) { 
    return fullMenu.map((r: Menu, i) =>(
      <IonHeader 
        key={"head_" + r.slug}
        class="hob-header">
        <IonToolbar class="hob-header">
          <IonItem
            key={"head_item_" + r.slug}
            class="hob-header border-none remove_inner_bottom">
            <IonImg
              class='back'
              onClick={() => history.goBack()}
              src={MyConst.icons.back}
              slot="start"
            ></IonImg>
            <IonThumbnail>
              <IonImg src={r.active_icon} alt={r.slug} />
            </IonThumbnail>
            <IonGrid>
              <IonRow>
                <IonCol><IonLabel class='header_title bold'>{t(r.name.toString())}</IonLabel></IonCol>
              </IonRow>
              <IonRow>
                <IonCol><IonLabel class='header_subtitle'>{t('EQUIPAMIENTO')}</IonLabel></IonCol>
              </IonRow>
            </IonGrid>          
          </IonItem>
        </IonToolbar>
      </IonHeader>
    ))
  }

  const [appEquipments, setRoutes] = useState<Equipment[]>([])
  useEffect(() => {
    fetch(MyConst.RestAPI + 'app-equipments')
      .then(res => res.json())
      .then(setRoutes)
  }, [])

  function renderEquipments(appEquipments: any, showType: string){

    var byTypes = []

    for(var i = 0; i < appEquipments.length; i++){
      for (var z = 0; z < appEquipments[i].description.length; z++) {
        var description = appEquipments[i].description[z]  
        if(description.language.code === lang){
          console.log(description)
          var name = description.name
        }
      }  
      if(appEquipments[i].type === showType){
        byTypes.push({
          'id'  : appEquipments[i].id,
          'type': appEquipments[i].type,
          'name':name,
          'icon': MyConst.RestStorage+appEquipments[i].caret.url,
        })
      }
    }

    return byTypes.map((equipment: any, index) =>
      <IonCol class='equipment_col' size="4">
        <IonThumbnail class='equipment_thumb'>
          <IonImg src={equipment.icon} alt={equipment.icon} />
        </IonThumbnail>
        {equipment.name}
      </IonCol>
    )
  }

  return (
    <IonPage>
      {renderHeader(fullMenu)}
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol class='bold left_equipment'>{t('PROVIDED')}</IonCol>
          </IonRow>
          <IonRow class='hob_equipment'>
            {renderEquipments(appEquipments, 'provided')}
          </IonRow>
          <IonRow>
          <IonCol class='bold'></IonCol>
          </IonRow>
          <IonRow>
            <IonCol class='bold left_equipment'>{t('RECOMMENDED')}</IonCol>
          </IonRow>
          <IonRow>
            {renderEquipments(appEquipments, 'recommended')}
          </IonRow>
        </IonGrid> 
      </IonContent>
    </IonPage>
  )

}

export default LiveMap;