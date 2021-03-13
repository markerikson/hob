import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'
//import axios from 'axios'

import { connect } from '../data/connect'
import { setIsLoggedIn, setUsername } from '../data/user/user.actions'

//import { logIn } from 'ionicons/icons';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({
  setIsLoggedIn,
  history,
  setUsername: setUsernameAction
}) => {

  const { t } = useTranslation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const login = async (e: React.FormEvent) => {

    e.preventDefault()

    setFormSubmitted(true)

    if(!username) {
      setUsernameError(true)
    }else{
      setUsernameError(false)
    }

    if(!password) {
      setPasswordError(true)
    }else{
      setPasswordError(false)
    }

    /*if(username && password) {

      const { data } = await axios.post('http://localhost:1337/auth/local', {
        //data :{
          identifier: 'reader@strapi.io',
          password: '2Y2s4qmliad',
        //}
      })
      
      console.log(data)
    }*/

  }

  return (
    <IonPage id='login-page'>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>
            <img src='assets/images/dump/app-logo.png' alt='Hoponboard.eu' width='50px'/>
            {t('Homepage').toUpperCase()}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className='login-logo'></div>

        <form noValidate onSubmit={login}>
          
          <IonList>

            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Owner alias')}</IonLabel>
              <IonInput name='username' type='text' value={username} spellCheck={false}
                autocapitalize='off' onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color='warning'>
              <p className='ion-padding-start'>{t('Owner alias is required')}</p>
            </IonText>}

            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Access key')}</IonLabel>
              <IonInput name='password' type='password' value={password}
                onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color='warning'>
              <p className='ion-padding-start'>{t('Password is required')}</p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol><IonButton type='submit' expand='block'>{t('Login')}</IonButton></IonCol>
            <IonCol><IonButton routerLink='/signup' color='light' expand='block'>{t('Signup')}</IonButton></IonCol>
          </IonRow>

        </form>

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