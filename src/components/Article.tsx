import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonToolbar, IonItem, IonCard, IonCardHeader, IonTitle, IonContent, IonSlides, IonSlide, IonButtons, IonBackButton } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

// Interfaces
//import { Content } from '../models/Content'
//import { Slide } from '../models/Slide'
import { Menu } from '../models/Menu'
import { Page } from '../models/Page'

const slideOpts = {
  initialSlide: 1,
  speed: 400,
  autoplay: true
}

interface ArticlePageProps extends RouteComponentProps<{
  slug: string;
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  /*const [slides, setSlides] = useState([{'icon_url':''}])
  useEffect(() => {
    fetch( 'assets/dump/contents/slides/'+match.params.slug+'.json' ).then(res => res.json()).then(setSlides)
  }, [match.params.slug])

  function renderSlider(list: Slide[]){
    return list.map((r: Slide, i) => (
        <IonSlide key={i}><img src={r.icon_url.toString()} alt={r.icon_url}/></IonSlide>   
    ))
  }*/

  const [content, setContent] = useState<Menu[]>([])
  useEffect(() => {
    fetch( 'assets/dump/contents/'+match.params.slug+'.json' ).then(res => res.json()).then(setContent)
  }, [match.params.slug])

  function renderIconTitle(list: Menu[]) {
    return list.map((r: Menu, i) => (
      <IonTitle key={i}>
        <img src={r.icon_url.toString()} alt={r.icon_url} width={'50px'}/>
        {r.name.toString()}
      </IonTitle>   
    ))
  }

  const [pages, setPages] = useState<Page[]>([])
  useEffect(() => {
    fetch( 'assets/dump/contents/articles/pages/'+match.params.slug+'.json' ).then(res => res.json()).then(setPages)
  }, [match.params.slug])

  function renderPages(list: Page[]){
    return list.map((r: Page, i) => (
      <IonSlide key={'page_'+i}>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{r.title.toString()}</IonCardSubtitle>
            <IonCardTitle>{r.title.toString()}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          <img src={r.image_url.toString()} alt={r.image_url}/>
            {r.description.toString()}
          </IonCardContent>
        </IonCard>
      </IonSlide>
    ))
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          {renderIconTitle(content)}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides pager={true} options={slideOpts}>
          {/*renderSlider(slides)*/}        
          {renderPages(pages)} 
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

export default Article