import * as MyConst from '../services/constants'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSlides, IonSlide, IonButtons, IonBackButton } from '@ionic/react'

// Interfaces
import { Content } from '../models/Content'
import { ArticleItf } from '../models/Article'

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

  // Fetching the vertical menu
  function rendertSlider(list: Content[]){
    var res = list.map((r: Content, i) => (
      <IonSlides key={'slider_'+r.id} pager={true} options={slideOpts}>
        <IonSlide>
          <img src={MyConst.RestStorage + r.icon.url.toString()} alt={r.name} width="50px"/>
        </IonSlide>   
      </IonSlides>
    ))
    return res
  }

  function renderTitle(list: Content[]) {
    return list.map((p, index) => (<IonTitle key={index}>{p.name.toString()}</IonTitle>))
  }

  function renderArticle(list: Content[]) {
    return list.map((p, index) => (<IonTitle key={index}>{p.name.toString()}</IonTitle>))
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
          <IonTitle>{renderTitle(content)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides pager={true} options={slideOpts}>
          {rendertSlider(content)} 
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

export default Article