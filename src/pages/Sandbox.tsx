import React from 'react'
import { IonHeader, IonContent, IonPage, IonItem, IonLabel } from '@ionic/react'

const mainLang = 'es'

interface hola {
  name: string;
  test: {
      label: string;
      language: string;
      placeholder: null;
  }[];
}

function test(hola: hola) {
  return(
    <IonItem>
      {hola.test.map((r, index) => (
        r.label === 'en' ? (<IonItem>A</IonItem>):(null)
      ))}
    </IonItem>
  )
}

const hola_var = {
  "name": "TestARRAYOBJECT MMMM.... HELP!!",
  "test": [
    {
      "label": "Test ES",
      "language": "es",
      "placeholder": null
    },
    {
      "label": "Test ES",
      "language": "es",
      "placeholder": null
    }
  ]
}

const Sandbox: React.FC = () => {

  return (
    <IonPage id='login-page'>
      <IonHeader>Please, help Me ^^!!</IonHeader>
      <IonContent>
        {test(hola_var)}
      </IonContent>
      
    </IonPage>
  )

}

export default Sandbox