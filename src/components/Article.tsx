import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonToolbar, IonCard, IonCardHeader, IonTitle, IonContent, IonSlides, IonSlide, IonButtons, IonBackButton
  //IonItem, 
} from '@ionic/react'
import { RouteComponentProps } from 'react-router'

// Translations...
import { useTranslation } from 'react-i18next'

// Interfaces
//import { Content } from '../models/Content'
//import { Slide } from '../models/Slide'
import { Menu } from '../models/Menu'
import { Page } from '../models/Page'

const slideOpts = {
  initialSlide: 1,
  speed: 500,
  autoplay: true
}

interface ArticlePageProps extends RouteComponentProps<{
  slug: string;
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const { t } = useTranslation()

  const [content, setContent] = useState<Menu[]>([])
  useEffect(() => {
    fetch( 'assets/dump/contents/'+match.params.slug+'.json' ).then(res => res.json()).then(setContent)
  }, [match.params.slug])

  function renderIconTitle(list: Menu[]) {
    return list.map((r: Menu, i) => (
      <IonTitle key={i}>
        <img src={r.active_icon.toString()} alt={r.active_icon} width={'50px'}/>
        {t(r.name.toString())}
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
            <IonCardSubtitle>{t(r.title.toString())}</IonCardSubtitle>
            <IonCardTitle>{t(r.title.toString())}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <img src={r.image_url.toString()} alt={r.image_url}/>
            {t(r.description.toString())}
          </IonCardContent>
        </IonCard>
      </IonSlide>
    ))
    
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
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