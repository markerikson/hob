import React, { useEffect, useState } from 'react'
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react'
import { Language } from '../models/Language'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {

  const { t, i18n } = useTranslation()
  
  const [languages, setLanguages] = useState<Language[]>([])
  useEffect(() => {
    fetch('assets/dump/others/languages.json').then(res => res.json()).then(setLanguages)
  }, [])

  return (
    <IonItem key='languageSelector'>
      <IonLabel position='stacked'>{t('Select your language')}</IonLabel>
      <IonSelect
        value={i18n.language}
        cancelText={t('Dismiss')}
        onIonChange={e => i18n.changeLanguage(e.detail.value)}>
        {languages.map((r, index) => (
          <IonSelectOption key={r.code} value={r.code}>{t(r.name)}</IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  )

}

export default LanguageSelector