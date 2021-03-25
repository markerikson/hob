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
  speed: 4000,
  autoplay: true
}

interface ArticlePageProps extends RouteComponentProps<{
  article: string;
  slide?: string;
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const { t } = useTranslation()

  /*const [article, setContent] = useState<Menu[]>([])
  useEffect(() => {
    fetch( 'assets/dump/articles/article-'+match.params.article+'.json' ).then(res => res.json()).then(setContent)
  }, [match.params.article])

  function renderIconTitle(list: Menu[]) {
    return list.map((r: Menu, i) => (
      <IonTitle key={i}>
        <img src={r.active_icon.toString()} alt={r.active_icon} width={'50px'}/>
        {t(r.name.toString())}
      </IonTitle>   
    ))
  }*/

  const [slides, setPages] = useState<Page[]>([])
  useEffect(() => {
    fetch( 'assets/dump/articles/slides/slide-'+match.params.article+'.json' ).then(res => res.json()).then(setPages)
  }, [match.params.article])

  if(match.params.slide){
    console.log(match.params.slide)
  }

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
      {/*<IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          renderIconTitle(article)
        </IonToolbar>
      </IonHeader>*/}
      <IonContent>
        <IonSlides pager={true} options={slideOpts}>          
          {renderPages(slides)}
        </IonSlides>
      </IonContent>
    </IonPage>
  )
  
}

export default Article