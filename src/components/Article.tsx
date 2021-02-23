import * as MyConst from '../services/constants'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSlides, IonSlide, IonButtons, IonBackButton } from '@ionic/react'

// Interfaces
import { Content } from '../models/Content'

const slideOpts = { initialSlide: 1, speed: 400 }

interface ArticlePageProps extends RouteComponentProps<{
  id: string;
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const [content, setContent] = useState([])
  useEffect(() => {
    fetch( 'http://161.97.167.92:1337/app-contents?id='+match.params.id )/*8 is a good one!!*/
    .then(res => res.json())
    .then(setContent)
  }, [match.params.id])

  console.log(content)

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
          <IonTitle>{match.params.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <h1>Slide 1</h1>
          </IonSlide>   
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

export default Article