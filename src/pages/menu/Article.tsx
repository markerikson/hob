/* eslint-disable react-hooks/exhaustive-deps */
import * as MyConst from '../../services/constants'


import React, { useEffect, useState } from 'react'

import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonList,
  IonItem,
  IonTitle,
  IonLabel,
  IonSlides,
  IonSlide,
} from '@ionic/react'
import { render } from '@testing-library/react';

const slideOpts = {
  initialSlide: 1,
  speed: 400
};

interface Media {
  url:string
}

interface Article {
  name: string,
  url: string,  
  media: Media
}

interface ArticlePageProps extends RouteComponentProps<{
  tag: string;
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const [article, setArticle] = useState<any['media']>([])

  useEffect(() => {
    fetch( MyConst.RestAPI + 'app-articles?tag=' + match.params.tag )
    .then(res => res.json())
    .then(setArticle)
  }, [])
  
  
  /*function renderSlider(list: Media[]) {
    return (
      <IonSlide>
          <h1>Slide 1</h1>
        </IonSlide>   
    )
  }*/
  
  console.log(article) 

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
