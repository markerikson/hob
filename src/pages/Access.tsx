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
import React, { useState, useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'

import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Menu } from '../models/Menu'
//import { Redirect, Route } from 'react-router-dom'

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from "jquery";


interface PageProps
  extends RouteComponentProps<{
    slug: string;
  }> {}
  
const Access: React.FC<PageProps> = ({ match }) => {

  const {t} = useTranslation()
  const history = useHistory();

  const [userKey, setUserKey] = useState('')
  const [userPass, setUserPass] = useState('')

  const [accesFormSubmitted, setAccesFormSubmitted] = useState(false)

  const [userKeyError, setUserKeyError] = useState(false)
  const [passwordError, setUserPassError] = useState(false)
  
  const [showToast1, setShowToast1] = useState(false);

  const [fullMenu, setMenu] = useState<Menu[]>([]);

  useEffect(() => {
    fetch(MyConst.menuDump + match.params.slug + ".json")
      .then((res) => res.json())
      .then(setMenu);
  }, [match.params.slug]);

  //var headerIcon = '';
  var slug = ''

  if(fullMenu[0] !== undefined){
    //headerIcon = fullMenu[0].active_icon
    slug = fullMenu[0].slug
  }

  const accesClientData = async (e: React.FormEvent) => {

    e.preventDefault()
    setAccesFormSubmitted(true)
    setShowToast1(true)
    
    if(!userKey) { setUserKeyError(true) }else{ setUserKeyError(false) }
    if(!userPass) { setUserPassError(true) }else{ setUserPassError(false) }

    if(userKey && userPass){

      const { data } = await axios.post(MyConst.RestAPI+'auth/local', {
        identifier: userKey,
        password:   userPass,
      })/*.catch(function (error) {

        if (error.response) {

          // Request made and server responded
          return error.response.data;
          //console.log(error.response.status);
          //console.log(error.response.headers);

        } else if (error.request) {

          // The request was made but no response was received
          return error.request;

        } else {

          // Something happened in setting up the request that triggered an Error
          return  error.message;

        }
      }*/

      if(data.user !== undefined){
        window.localStorage.setItem('creator::id', data.user.creator.toString())
        window.localStorage.setItem('creator::assistance_number', data.user.contact_number.toString())
        window.localStorage.setItem('creator::data', JSON.stringify(data.user))
        window.location.href = "/LiveMenu/"+slug;
      }

      
    }

  }

  useIonViewWillEnter(() => {
    toggleFooter()
  });

  // Show and hide the footer over LiveMenu
  function toggleFooter(){
    if(MyConst.JustTesting) console.info('Toggle footer! (LiveMenu::useIonViewWillEnter)');
    if( MyConst.menuSettings.hiddenFooter.indexOf(window.location.pathname) === -1){      
      jQuery('.hob-footer').removeClass('hidden')
    }else{
      jQuery('.hob-footer').addClass('hidden')
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
          <IonLabel key={"header-label" + r.slug} class='h1 bold'>{t(r.name)}</IonLabel>
        </IonItem>
      </IonToolbar>
    </IonHeader>)
  }

  return (
    <IonPage id='login-page'>

      {renderHeader(fullMenu)}

      <IonContent>

        <div className='login-logo'>
        </div>
          <IonLabel 
            class='access_text'
            position='floating'>
            {t(MyConst.messages.accessText)}      
          </IonLabel>

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
                color='soft-blue'
                class='bold'
                >
                {t(MyConst.messages.submitAcces)}
              </IonButton>
            </IonCol>
          </IonRow>

        </form>

        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
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