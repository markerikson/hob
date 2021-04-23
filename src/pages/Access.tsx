import * as MyConst from '../static/constants'

import React, { useState,
  //useEffect,  
} from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

import { useTranslation } from 'react-i18next'
import { Redirect, Route } from 'react-router-dom'
import axios from 'axios'

import { connect } from '../data/connect'
import { setAccessAllowed, setUserKey } from '../data/user/user.actions'

// Static
import { appClient } from '../static/appClient'

// Models
//import { Menu } from '../models/Menu'

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setAccessAllowed: typeof setAccessAllowed
  setUserKey: typeof setUserKey
}

interface LoginProps extends OwnProps,  DispatchProps  {}

const Access: React.FC<LoginProps> = ({
    setAccessAllowed,
    history,
    setUserKey: setUserKeyAction, 
    // TODO: Put slug!!!
  }) => {

  const {t} = useTranslation()

  const [userKey, setUserKey] = useState('')
  const [userPass, setUserPass] = useState('')
  //const [access_menu, setAccessMenu] = useState('')

  const [accesFormSubmitted, setAccesFormSubmitted] = useState(false)
  const [userKeyError, setUserKeyError] = useState(false)
  const [passwordError, setUserPassError] = useState(false)

  var offlineStore = window.localStorage

  const accesClientData = async (e: React.FormEvent) => {

    e.preventDefault()
    setAccesFormSubmitted(true)
    
    if(!userKey) { setUserKeyError(true) }else{ setUserKeyError(false) }
    if(!userPass) { setUserPassError(true) }else{ setUserPassError(false) }

    if(userKey && userPass){

      if(MyConst.corsSetted && !MyConst.JustTesting){
        // TODO: SET CORS ON SERVER!!!
        // TODO: Move to awaitable place!!!
        //const { data } = await axios.post(MyConst.RestAPI+'auth/local', {
        //  identifier: MyConst.appUserEmail,
        //  password:   MyConst.appPass,
        //})
        //return appClient
      }else{

        if(MyConst.JustTesting) console.log('Saving client data!!')
        offlineStore.setItem('creator::id', appClient.user.creator.toString())
        offlineStore.setItem('creator::data', JSON.stringify(appClient.user))
        // RODO Redirect to Routes ;);););)
        window.location.href = "/LiveMenu/train-yourself";

      }
      
    }

  }


  
  // In future show icon from App Settings
  //const [menu, setMenus] = useState<Menu[]>([])
  //useEffect(() => {
  //  fetch('assets/dump/menus/menu-train-yourself.json').then(res => res.json()).then(setMenus)
  //}, [])

  //console.log(menu)

  return (
    <IonPage id='login-page'>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>
            <img
              src='assets/images/dump/app-logo.png'
              alt='Hoponboard.eu'
              width='50px'/>
              {t(MyConst.messages.accessFormTitle)}      
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className='login-logo'></div>

        <form noValidate onSubmit={accesClientData}>
          
          <IonList>

            <IonItem>

              <IonLabel 
                color='primary'
                position='stacked'>
                {t(MyConst.messages.userKeyLabel)}      
              </IonLabel>

              <IonInput
                name='userKey'
                type='text'
                value={userKey}
                spellCheck={false}
                autocapitalize='off'
                onIonChange={e => setUserKey(e.detail.value!)}
                required>
              </IonInput>

            </IonItem>

            { accesFormSubmitted && userKeyError &&
              <IonText color='warning'>
                <p className='ion-padding-start'>
                  {t(MyConst.messages.userKeyRequired)}
                </p>
              </IonText>
            }

            <IonItem>

              <IonLabel
                color='primary'
                position='stacked'>
                {t(MyConst.messages.userPassLabel)}
              </IonLabel>

              <IonInput
                name='password'
                type='password'
                value={userPass}
                onIonChange={e => setUserPass(e.detail.value!)}>
              </IonInput>

            </IonItem>

            { accesFormSubmitted && passwordError && 
              <IonText color='warning'>
                <p className='ion-padding-start'>
                {t(MyConst.messages.userPassRequired)}
                </p>
              </IonText>
            }

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton
                type='submit'
                expand='block'
                color='soft-blue'>
                {t(MyConst.messages.submitAcces)}
              </IonButton>
            </IonCol>
          </IonRow>

        </form>

      </IonContent>

    </IonPage>
  )

}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: { setAccessAllowed, setUserKey },
  component: Access
})