import React, { useEffect, useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSelect, IonSelectOption, IonButtons,  IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

import { setIsLoggedIn, setUsername } from '../data/user/user.actions'
import { connect } from '../data/connect'
import { Language } from '../models/Language'

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, history, setUsername: setUsernameAction }) => {

  const { t, i18n } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [formSubmitted/*, setFormSubmitted*/] = useState(false)
  const [usernameError/*, setUsernameError*/] = useState(false)
  const [passwordError/*, setPasswordError*/] = useState(false)
  
  //const [showAlert1, setShowAlert1] = useState(false)
  //const [showAlert2, setShowAlert2] = useState(false)

  /*const login = async (e: React.FormEvent) => {

    e.preventDefault()

    setFormSubmitted(true)

    if(!username) {
      setUsernameError(true)
    }
    if(!password) {
      setPasswordError(true)
    }

    if(username && password) {
      await setIsLoggedIn(true)
      await setUsernameAction(username)
      history.push('/tabs/schedule', {direction: 'none'})
    }

  }*/

  const [languages, setLanguages] = useState<Language[]>([])
  useEffect(() => {
    fetch('assets/dump/others/languages.json')
      .then(res => res.json()).then(setLanguages)
  }, [])

  // Setting footer icons from LiveMenu file... Must be INSIDE for performance reasons, as each content :P
  function renderLangs(list: Language[]) {
    return list.map((r: Language, index) => (
      <IonSelectOption value={r.code}>{t(r.name)}</IonSelectOption>
    ))
  }

  return (
    <IonPage id='login-page'>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className='login-logo'>
          <img src='assets/images/dump/app-logo.png' alt='Hoponboard.eu' />
        </div>

        <form noValidate /*{onSubmit={login}}*/>
          
          <IonList>
            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Owner alias')}</IonLabel>
              <IonInput name='username' type='text' value={username} spellCheck={false} autocapitalize='off' onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color='danger'>
              <p className='ion-padding-start'>{t('Owner alias is required')}</p>
            </IonText>}

            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Access key')}</IonLabel>
              <IonInput name='password' type='password' value={password} 
                onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color='danger'>
              <p className='ion-padding-start'>{t('Password is required')}</p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type='submit' expand='block'>{t('Login')}</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink='/signup' color='light' expand='block'>{t('Signup')}</IonButton>
            </IonCol>
          </IonRow>
        </form>      

        <IonItem>
          <IonLabel position='stacked'>{t('Select your language')}</IonLabel>
          <IonSelect value={i18n.language} okText={'ok'} cancelText={'dismiss'}
            onIonChange={e => i18n.changeLanguage(e.detail.value)}>
              {renderLangs(languages)}
          </IonSelect>
        </IonItem>

      </IonContent>

    </IonPage>
  )

}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})