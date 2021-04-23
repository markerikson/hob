import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'
//import axios from 'axios'

import { connect } from '../data/connect'
import { setAccessAllowed, setUserKey } from '../data/user/user.actions'

//import { logIn } from 'ionicons/icons';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setAccessAllowed: typeof setAccessAllowed
  setUserKey: typeof setUserKey
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({
  setAccessAllowed,
  history,
  setUserKey: setUserKeyAction
}) => {

  const {t} = useTranslation()

  const [username, setUserKey] = useState('')
  const [password, setPassword] = useState('')

  const [accesFormSubmitted, setAccesFormSubmitted] = useState(false)
  const [userKeyError, setUserKeyError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const login = async (e: React.FormEvent) => {

    e.preventDefault()

    setAccesFormSubmitted(true)

    if(!username) {      setUserKeyError(true)    }else{      setUserKeyError(false)    }
    if(!password) {      setPasswordError(true)    }else{      setPasswordError(false)    }

    // Access to the platform for verify the app .env's and in the future 
    /*
    function appLogin() {
      if(MyConst.corsSetted && !MyConst.JustTesting){
        // TODO: SET CORS ON SERVER!!!
        // TODO: Move to awaitable place!!!
        //const { data } = await axios.post(MyConst.RestAPI+'auth/local', {
        //  identifier: MyConst.appUserEmail,
        //  password:   MyConst.appPass,
        //})
        return appClient
      }else{
        return appClient
      }
    }  
    console.log(appLogin())
    */

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
                autocapitalize='off' onIonChange={e => setUserKey(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {accesFormSubmitted && userKeyError && <IonText color='warning'>
              <p className='ion-padding-start'>{t('Owner alias is required')}</p>
            </IonText>}

            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Access key')}</IonLabel>
              <IonInput name='password' type='password' value={password}
                onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {accesFormSubmitted && passwordError && <IonText color='warning'>
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
    setAccessAllowed,
    setUserKey
  },
  component: Login
})