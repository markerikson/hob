import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonSelectOption, IonIcon,  IonSelect, IonContent, IonToolbar,  IonItem, IonLabel } from '@ionic/react'
import LanguageSelector from '../components/LanguageSelector'
import { settings } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'

const Settings: React.FC = () => {

  const { t, i18n } = useTranslation()

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonIcon icon={settings}/>
          {t('Settings Page')}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <LanguageSelector/>
      </IonContent>
    </IonPage>
  )
  
}

export default Settings