import React, { useEffect, useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonSelect, IonSelectOption,  IonButtons,  IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

import { setIsLoggedIn, setUsername } from '../data/user/user.actions'
import { connect } from '../data/connect'
import { Language } from '../models/Language'
//import i18n from '../helpers/i18n';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setUsername: typeof setUsername
}



interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);

  /*const login = async (e: React.FormEvent) => {

    e.preventDefault();

    setFormSubmitted(true);

    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/tabs/schedule', {direction: 'none'});
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
      <IonButtons key={index}>
        <IonLabel position="stacked" color="primary">{r.name}</IonLabel>
      </IonButtons>
    ))
  }


  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate /*{onSubmit={login}}*/>
          
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>
        </form>
        
        {renderLangs(languages)}
        <IonItem>
          <IonLabel position="stacked">{'selector_title'}</IonLabel>
          <IonSelect value={i18n.language} okText={'ok'} cancelText={'dismiss'} onIonChange={e => i18n.changeLanguage(e.detail.value)}>
          <IonSelectOption value="en">{'english'}</IonSelectOption>
          <IonSelectOption value="tr">{'turkish'}</IonSelectOption>
          <IonSelectOption value="fr">{'french'}</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})