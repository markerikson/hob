import * as MyConst from '../static/constants'
import React, { useEffect, useState } from 'react'
import {
  IonPage,
  IonLabel,
  IonGrid,
  IonCard,
  IonTextarea,
  IonRow,
  IonCol,
  IonCardContent,
  IonContent,
  IonSlide,
  IonSlides,
  IonImg,
  IonItem,
  IonThumbnail,
  IonHeader,
  IonToolbar
} from '@ionic/react'
import { RouteComponentProps } from 'react-router'

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from 'jquery'

// Translations...
import { useTranslation } from 'react-i18next'

// Interfaces
import { Slide } from '../models/Slide'
import { Menu } from '../models/Menu'
//import { setAccessAllowedData } from '../data/dataApi'

interface ArticlePageProps extends RouteComponentProps<{
  slug:  string,
  slide: string,
  step:  string,
}> {}

const Article: React.FC<ArticlePageProps> = ({match}) => {

  const {t} = useTranslation()

  const slideOpts = {
    initialSlide: match.params.step ?? '0',
    //speed: 500,
    //autoplay: false,
    autoHeight: false,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 0,
    loop: false
  }

  const [article, setContent] = useState<Menu[]>([])
  useEffect(() => {
    fetch( MyConst.articleDump + match.params.slug+'.json' ).then(res => res.json()).then(setContent)
  }, [match.params.slug])

  var title = article[0] ? article[0].name : 'Article name'
 
  function renderHeader(menus: Menu[]) {
    return menus.map((r: Menu, i) => (
      <IonItem class='hob-header border-none remove_inner_bottom' key={i}>
        <a href={r.parent}><img src='/assets/images/arrow-left.svg' alt={t('BACK')} slot='start'></img></a>
        <IonThumbnail>      
          <IonImg src={r.active_icon} alt={t(r.name.toString())}/>
        </IonThumbnail>
        <IonGrid>
          <IonRow>
            <IonCol><IonLabel class='header_title bold'>{t(r.name.toString())}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonLabel class='header_subtitle'></IonLabel></IonCol>
          </IonRow>
        </IonGrid>        
        {/*<IonSearchbar placeholder='Type here...' value={search} showCancelButton='focus'></IonSearchbar>*/}
      </IonItem>
    ))
  }

  const [slides, setPages] = useState<Slide[]>([])
  useEffect(() => {
    fetch( MyConst.slideDump+match.params.slug+'.json' ).then(res => res.json()).then(setPages)
  }, [match.params.slug])

  function renderSlides(list: Slide[]){
    return list.map((r: Slide, i) => (
      <IonSlide key={i}>
        <IonCard 
          class='hob_card'>
          <IonCardContent>
            <img src={r.image_url.toString()} alt={r.image_url}/><br/>
              <IonTextarea
                class='hob_slide_textarea'
                disabled
                readonly
                value={t(r.description_md5)}>
              </IonTextarea>
          </IonCardContent>
        </IonCard>
      </IonSlide>
    ))    
  }
  
  // Change the header subtitle pending on slide 'hidden content'
  const setLabel = async (event: any, slides: Slide[], title: any) => {
    let labelClass = '.header_subtitle'
    let index = 1
    await event.target.getActiveIndex().then((value: any) => (index=value))
    if(slides[index] !== undefined){

      let result = ''
      let now = jQuery(labelClass).html()

      if( slides[index].title !== title ){
        result += slides[index].title
      }

      if(slides[index].label !== ''){
        if(result !== '') result += ' - '        
        result += slides[index].label
      }

      if(result !== now){
        var fadeVelocity = (match.params.step === index.toString()) ? 100 : MyConst.fadeVelocity
        jQuery(labelClass).fadeOut(fadeVelocity,        
          function() {          
            jQuery(labelClass).html(result)
            jQuery(labelClass).fadeIn(fadeVelocity)
        })
      }

    }else{
      jQuery(labelClass).fadeOut('fast')
    }
  }

  /*
  var creator_id = localStorage.getItem('creator::id')
  if(MyConst.menuSettings.freeAccess.indexOf(window.location.pathname) !== -1){
    //console.log('You have free access here!! :)')  
  }else{
    if( creator_id !== null ){
      //console.log('Hello you have granted access, '+creator_id)
    }else{
      //alert("You don't have acces to this area...")
      //window.location.href = '/Access/train-yourself'      
    }
  }*/

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