//import * as MyConst from '../static/constants'
import React, { useEffect, useState } from 'react'
import { IonPage, IonLabel, IonGrid, IonCard, IonRow, IonCol, IonCardContent, IonContent, IonSlide, IonSlides, IonImg, IonItem, IonThumbnail, IonHeader, IonToolbar,
  //IonButton,
  //IonCardHeader
} from '@ionic/react'
import jQuery from 'jquery'
import { 
  RouteComponentProps, 
  //useLocation
} from 'react-router'


// Translations...
import { useTranslation } from 'react-i18next'

// Interfaces
import { Slide } from '../models/Slide'
import { Menu } from '../models/Menu'
//import { setIsLoggedInData } from '../data/dataApi'

interface ArticlePageProps extends RouteComponentProps<{
  slug:   string,
  slide: string,
  step:  string,
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const {t} = useTranslation()
  //const location = useLocation()

  let slideOpts = {
    initialSlide: match.params.step ?? 0,
    speed: 6000,
    autoplay: false,
    autoHeight: false,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 0,
    loop: false
  }

  const [article, setContent] = useState<Menu[]>([])
  useEffect(() => {
    fetch( 'assets/dump/articles/article-'+match.params.slug+'.json' ).then(res => res.json()).then(setContent)
  }, [match.params.slug])

  var title = article[0] ? article[0].name : ''
 
  function renderHeader(menus: Menu[]) {
    return menus.map((r: Menu, i) => (
      <IonItem class='hob-header' key={i}>
        <a href={r.parent}><img src='/assets/images/arrow-left.svg' alt={t('BACK')} slot='start'></img></a>
        <IonThumbnail>      
          <IonImg src={r.active_icon} alt={t(r.name.toString())}/>
        </IonThumbnail>
        <IonGrid>
          <IonRow>
            <IonCol><IonLabel>{t(r.name.toString())}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonLabel class='sub_title'></IonLabel></IonCol>
          </IonRow>
        </IonGrid>        
        {/*<IonSearchbar placeholder='Type here...' value={search} showCancelButton='focus'></IonSearchbar>*/}
      </IonItem>
    ))
  }

  const [slides, setPages] = useState<Slide[]>([])
  useEffect(() => {
    fetch( 'assets/dump/articles/slides/slide-'+match.params.slug+'.json' ).then(res => res.json()).then(setPages)
  }, [match.params.slug])

  function renderSlides(list: Slide[]){
    return list.map((r: Slide, i) => (
      <IonSlide key={i}>
        <IonCard>
          {/*<IonCardHeader>
            <IonItem key={i}>
              <IonLabel>
              { r.label
                  ? t(r.title.toString())+' - '+t(r.label.toString())
                  : t(r.title.toString())
              }
              </IonLabel>
              <IonButton color='tag-grey' shape='round'>{t(r.num_tag.toString())}</IonButton>
            </IonItem>
          </IonCardHeader>*/}
          <IonCardContent>
            <img src={r.image_url.toString()} alt={r.image_url}/><br/>
            {t(r.description_md5.toString())}
          </IonCardContent>
        </IonCard>
      </IonSlide>
    ))    
  }
  
  var labelClass = '.sub_title'
  const setLabel = async (event: any, slides: Slide[], title: any) => {
    let index = 1
    await event.target.getActiveIndex().then((value: any) => (index=value))
    if(slides[index] !== undefined){

      let result = ''

      if( slides[index].title !== title ){
        result += slides[index].title
      }
      if(slides[index].label !== ''){
        if(result !== '') result += ' - '        
        result += slides[index].label
      }
      jQuery(labelClass).fadeOut(500,        
        function() {          
          jQuery(labelClass).html(result)
          jQuery('.sub_title').fadeIn('slow')
      })

    }else{
      jQuery(labelClass).fadeOut('fast')
    }
  }

  return(
    <IonPage>
      <IonHeader class='hob-header'>
        <IonToolbar class='hob-header'>   
          {renderHeader(article)}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides
          key='MySlides'
          pager={true}
          options={slideOpts}
          onIonSlidesDidLoad={(event: any)=> setLabel(event, slides, title)}
          onIonSlideTransitionStart={(event: any)=> setLabel(event, slides, title)}          
        >{renderSlides(slides)}
        </IonSlides>
      </IonContent>
    </IonPage>
  )
  
}

export default Article