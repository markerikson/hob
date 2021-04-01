import React, { useEffect, useState } from 'react'
import {
  IonPage, 
  IonLabel,
  IonCard,
  IonCardHeader, 
  IonCardContent,
  IonContent,
  IonSlide,
  IonSlides,
  IonImg,
  IonItem, 
  IonThumbnail,
  IonHeader,
  IonToolbar,
  //IonHeader,   
  //IonCardTitle,
  //IonCardSubtitle, 
  //IonToolbar, 
  //IonTitle,
  //IonButtons,
  //IonBackButton,
  //IonItem,
} from '@ionic/react'
import { RouteComponentProps, 
  //useLocation
} from 'react-router'

// Translations...
import { useTranslation } from 'react-i18next'

// Interfaces
import { Page } from '../models/Page'
import { Menu } from '../models/Menu'

interface ArticlePageProps extends RouteComponentProps<{
  article: string;
  slide?: string;
  step?: string;
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const {t} = useTranslation()
  //const location = useLocation()

  let slideOpts = {
    initialSlide: match.params.step ?? 0,
    speed: 4000,
    autoplay: false
  }

  const [article, setContent] = useState<Menu[]>([])
  useEffect(() => {
    fetch( 'assets/dump/articles/article-'+match.params.article+'.json' ).then(res => res.json()).then(setContent)
  }, [match.params.article])

  /*function renderIconTitle(list: Menu[]) {
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

  function renderSlides(list: Page[]){
    return list.map((r: Page, i) => (
      <IonSlide key={i}>
        <IonCard>
          <IonCardHeader>
          <IonItem key={i}>
            <IonLabel slot='start'>{t(r.title.toString())}</IonLabel>
            { r.label ? <IonLabel slot='start'>{t(r.label.toString())}</IonLabel> : '' }
            <IonLabel slot='end'>{t(r.num_tag.toString())}</IonLabel>
          </IonItem>
          </IonCardHeader>
          <IonCardContent>
            <img src={r.image_url.toString()} width='800px' alt={r.image_url}/><br/>
            {t(r.description.toString())}
          </IonCardContent>
        </IonCard>
      </IonSlide>
    ))    
  }

  function renderArticleTitle(menus: Menu[]) {
    return menus.map((r: Menu, i) => (
      <IonItem class='hob-header' key={i}>
        <a href={r.parent}><img src='/assets/images/arrow-left.svg' alt={t('BACK')} slot='start'></img></a>
        <IonThumbnail>      
          <IonImg src={r.active_icon} alt={''}/>
        </IonThumbnail>
        <IonLabel>{t(r.name.toString())}</IonLabel>
        {/*<IonSearchbar placeholder='Type here...' value={search} showCancelButton='focus'></IonSearchbar>*/}
      </IonItem>
    ))
  }

  return(
    <IonPage>
      <IonHeader class='hob-header'>
        <IonToolbar class='hob-header'>   
          {renderArticleTitle(article)}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides pager={true} options={slideOpts}>          
          {renderSlides(slides)}
        </IonSlides>
      </IonContent>
    </IonPage>
  )
  
}

export default Article