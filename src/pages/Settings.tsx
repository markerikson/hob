import React
  //,{ useEffect, useState }
from 'react'
import { IonPage, IonHeader, IonIcon,  IonContent, IonToolbar } from '@ionic/react'
import LanguageSelector from '../components/LanguageSelector'
import { settings } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'

const Settings: React.FC = () => {

  const {t} = useTranslation()

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