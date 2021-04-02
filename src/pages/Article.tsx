import React, { 
  useEffect, 
  useState 
} from 'react'

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
  IonButton
} from '@ionic/react'

import { 
  RouteComponentProps, 
  //useLocation
} from 'react-router'


// Translations...
import { useTranslation } from 'react-i18next'

// Interfaces
import { Page } from '../models/Page'
import { Menu } from '../models/Menu'


interface ArticlePageProps extends RouteComponentProps<{
  slug:   string,
  slide?: string,
  step?:  string,
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const { t } = useTranslation()
  //const location = useLocation()

  let slideOpts = {
    initialSlide: match.params.step ?? 0,
    speed: 4000,
    autoplay: false
  }

  const [article, setContent] = useState<Menu[]>([])
  useEffect(() => {
    fetch( 'assets/dump/articles/article-'+match.params.slug+'.json' ).then(res => res.json()).then(setContent)
  }, [match.params.slug])
 
  const [slides, setPages] = useState<Page[]>([])
  useEffect(() => {
    fetch( 'assets/dump/articles/slides/slide-'+match.params.slug+'.json' ).then(res => res.json()).then(setPages)
  }, [match.params.slug])

  function renderSlides(list: Page[]){
    return list.map((r: Page, i) => (
      <IonSlide key={i}>
        <IonCard>
          <IonCardHeader>
          <IonItem key={i}>
            <IonLabel>
            { t(r.title.toString())+r.label
                ? ' - '+t(r.label.toString())
                : ''
            }
            </IonLabel>
            <IonButton color='soft-blue'>{t(r.num_tag.toString())}</IonButton>
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
          <IonImg src={r.active_icon} alt={t(r.name.toString())}/>
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