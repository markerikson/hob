import * as MyConst from '../static/constants'
import {
  IonHeader,
  IonToast,
  IonToolbar,
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonThumbnail,
  IonImg,
  useIonViewWillEnter
/*
  IonTitle,
  IonButtons,
  IonMenuButton, 
*/
} from '@ionic/react'
//import { Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'

import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Menu } from '../models/Menu'
//import { Redirect, Route } from 'react-router-dom'

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from "jquery";


interface PageProps extends RouteComponentProps<{
  user: string;
  password: string;
}> {}
  
const Access: React.FC<PageProps> = ({ match }) => {

  const {t} = useTranslation()
  const history = useHistory();

  const [userKey, setUserKey] = useState('')
  const [userPass, setUserPass] = useState('')

  const [accesFormSubmitted, setAccesFormSubmitted] = useState(false)

  const [userKeyError, setUserKeyError] = useState(false)
  const [passwordError, setUserPassError] = useState(false)
  
  const [showToast, setShowToast] = useState(false);

  const [fullMenu, setMenu] = useState<Menu[]>([]);
  useEffect(() => {
    fetch(MyConst.menuDump + "train-yourself.json")
      .then((res) => res.json())
      .then(setMenu);
  }, []);

  var menuSlug = ''

  if(fullMenu[0] !== undefined){
    menuSlug = fullMenu[0].slug
  }

  const accessClientData = async (e: React.FormEvent) => {

    e.preventDefault()
    setAccesFormSubmitted(true)
    setShowToast(true)
    
    if(!userKey) { setUserKeyError(true) }else{ setUserKeyError(false) }
    if(!userPass) { setUserPassError(true) }else{ setUserPassError(false) }

    if(userKey && userPass){

      const { data } = await axios.post(MyConst.RestAPI+'auth/local', {
        identifier: userKey,
        password:   userPass,
      })

      if(data.user !== undefined){

        window.localStorage.setItem('creator:id', data.user.creator.toString())
        window.localStorage.setItem('creator:contact_number', data.user.contact_number)
        window.localStorage.setItem('creator:assistance_number', '061')
        window.localStorage.setItem('creator:data', JSON.stringify(data.user))

        history.replace("/LiveMenu/"+menuSlug)

      }else{
        alert("You don't have acces permission or somethign where wrong with your credentials. Please, try again!")
      }
      
    }
    //console.log('Problems to access to th erestricted area...')

  }

  if(match.params.user !== undefined && match.params.password !== undefined ){
    console.log('Auto Login!!!')
    jQuery('#userKey').attr('value', 'asdfasf')
    //localStorage.setItem('user', match.params.user)
    //localStorage.setItem('password', match.params.password)    
    //istory.replace("/")

  }

  useIonViewWillEnter(() => {
    toggleFooter()
  });

  // Show and hide the footer over LiveMenu
  function toggleFooter(){
    //if(MyConst.JustTesting) console.info('Toggle footer! (LiveMenu::useIonViewWillEnter)');
    if( MyConst.menuSettings.hiddenFooter.indexOf(window.location.pathname) === -1){      
      jQuery('.footer_tab').removeClass('hidden')
    }else{
      jQuery('.footer_tab').addClass('hidden')
    }
  }
  
  // In future show icon from App Settings
  //const [menu, setMenus] = useState<Menu[]>([])
  //useEffect(() => {
  //  fetch('assets/dump/menus/menu-train-yourself.json').then(res => res.json()).then(setMenus)
  //}, [])

  //console.log(menu)

  function renderHeader(fullMenu: Menu[]) {
    return fullMenu.map((r: Menu, i) =>
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
          <IonLabel key={"header-label" + r.slug} class='h1 bold'>{t('WELLCOME TO HOPONBOARD.EU')}</IonLabel>
        </IonItem>
      </IonToolbar>
    </IonHeader>)
  }

  return (
    <IonPage id='login-page'>

      {renderHeader(fullMenu)}

      <IonContent>

        <div className='login-logo'></div>

        {/*<IonLabel 
          class='access_text'
          position='floating'>
          {t(MyConst.messages.accessText)}      
        </IonLabel>*/}

        <form noValidate onSubmit={accessClientData}>
          <IonList>

            <IonItem>
              <IonLabel
                class='bold'
                position='stacked'>
                {t(MyConst.messages.userKeyLabel)}      
              </IonLabel>
              <IonInput
                id='userKey'
                name='userKey'
                type='email'
                value={userKey}
                spellCheck={false}
                autocapitalize='off'
                onIonChange={e => setUserKey(e.detail.value!)}
                required>
              </IonInput>
              { accesFormSubmitted && userKeyError &&
                <IonText color='primary'>
                  <p className='ion-padding-start bold'>
                    {t(MyConst.messages.userKeyRequired)}
                  </p>
                </IonText>
              }
            </IonItem>

            <IonItem>
              <IonLabel
                class='bold'
                position='stacked'
                >
                {t(MyConst.messages.userPassLabel)}
              </IonLabel>
              <IonInput
                id='password'
                name='password'
                type='password'
                value={userPass}
                onIonChange={e => setUserPass(e.detail.value!)}>
              </IonInput>
              { accesFormSubmitted && passwordError && 
                <IonText color='primary'>
                  <p className='ion-padding-start bold'>
                  {t(MyConst.messages.userPassRequired)}
                  </p>
                </IonText>
              }
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton
                type='submit'
                id='loginSubmit'
                expand='block'
                color='soft-blue'
                class='bold'
                >
                {t(MyConst.messages.submitAcces)}
              </IonButton>
            </IonCol>
          </IonRow>

        </form>

        <IonToast
          id='accessToast'
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={t(MyConst.messages.submitAcces)}
          duration={200}
        />

      </IonContent>

    </IonPage>
  )

}

/*export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: { setAccessAllowed, setUserKey },
  component: Access
})*/

export default Access