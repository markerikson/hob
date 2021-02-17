/* eslint-disable react-hooks/exhaustive-deps */
//import * as MyConst from '../services/constants'

import React, { useEffect, useState } from 'react'
import { RouteComponentProps,
} from 'react-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSlides,
  IonSlide,
  //IonLabel,
  //IonList,
  //IonItem,
} from '@ionic/react'
//import { render } from '@testing-library/react'

const slideOpts = { initialSlide: 1, speed: 400 }

interface Media {
  url: string
}

interface Article {
  url: string,  
  name: string,
  media: Media
}
interface ArticlePageProps extends RouteComponentProps<{
  tag: string;
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const [article, setArticle] = useState([])

  useEffect(() => {
    fetch( 'http://161.97.167.92:1337/app-articles?slug='+match.params.tag )
    .then(res => res.json())
    .then(setArticle)
  }, [])
  console.log(article)
  
  /*function renderSlider(list: Media[]) {
    return (
      <IonSlide>
          <h1>Slide 1</h1>
        </IonSlide>   
    )
  }*/
  

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{match.params.tag}</IonTitle>
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
