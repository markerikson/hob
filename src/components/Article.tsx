import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSlides, IonSlide, IonButtons, IonBackButton } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

// Interfaces
import { Content } from '../models/Content'
import { Slide } from '../models/Slide'
import { Menu } from '../models/Menu'

const slideOpts = {
  initialSlide: 1,
  speed: 400,
  autoplay: true
}

interface ArticlePageProps extends RouteComponentProps<{
  slug: string;
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const [content, setContent] = useState([{'icon_url':''}])
  useEffect(() => {
    fetch( 'assets/dump/contents/slides/'+match.params.slug+'.json' ).then(res => res.json()).then(setContent)
  }, [match.params.slug])

  function rendertSlider(list: Slide[]){
    return list.map((r: Slide, i) => (
        <IonSlide key={i}><img src={r.icon_url.toString()} alt={r.icon_url}/></IonSlide>   
    ))
  }

  const [content2, setContent2] = useState<Menu[]>([])
  useEffect(() => {
    fetch( 'assets/dump/contents/'+match.params.slug+'.json' ).then(res => res.json()).then(setContent2)
  }, [match.params.slug])

  function renderIconTitle(list: Menu[]) {
    return list.map((r: Menu, i) => (
      <IonTitle key={i}>
        <img src={r.icon_url.toString()} alt={r.icon_url} width={'50px'}/>
        {r.name.toString()}
      </IonTitle>   
    ))
  }

  const [content3, setContent3] = useState<Menu[]>([])
  useEffect(() => {
    fetch( 'assets/dump/pages/'+match.params.slug+'.json' ).then(res => res.json()).then(setContent3)
  }, [match.params.slug])
  /*
  function renderArticle(list: Content[]) {
    return list.map((p, index) => (<IonTitle key={index}>{p.name.toString()}</IonTitle>))
  }*/

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          {renderIconTitle(content2)}
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