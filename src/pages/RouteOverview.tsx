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
import { RouteComponentProps, useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import jQuery from 'jquery'// Ohhh!!! :D :D This code looks happy now ^_^

import { Menu } from '../models/Menu'
import { SlideRoute } from '../models/SlideRoute'

interface RoutePageProps extends RouteComponentProps<{
  route:  string
  step:   string
}> {}

const RouteOverview: React.FC<RoutePageProps> = ({match}) => {

  const {t} = useTranslation()
  const history = useHistory()
  var lang = localStorage.getItem("i18nextLng")
  var title = t('Cala de deià!!')

  const slideOpts = {
    initialSlide: match.params.step.toString(),
    autoHeight: false,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 0,
    loop: false,
    //speed: 500,
    //autoplay: false,
  }
/*
  console.log(slideOpts)

  ionSlidesDidLoad(() => {
    console.log( console.log(slideOpts))
  });
*/

  const [fullMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.menuDump + "routes.json")
      .then((res) => res.json())
      .then(setMenu)
  }, [])

  const [mapRoute, setRoute] = useState<[]>([])
  useEffect(() => {
    fetch(MyConst.RestAPI + 'routes?id='+match.params.route)
      .then(res => res.json())
      .then(setRoute)
  }, [match.params.route])

  if(mapRoute !== undefined){
    //if(mapRoute[0] !== undefined) title = mapRoute[0].name
  }

  function setSlidesData(mapRoute: any){

    var slideData = []
    if(mapRoute[0] !== undefined){
      
      for (var i = 0; i < mapRoute[0].description.length; i++) {
        var description = mapRoute[0].description[i]
        if(description.language.code === lang){
          var label_translation = description.label
          var description_translation = description.description
        }
      }

      var images = []
      for (var u = 0; u < mapRoute[0].images.length; u++) {
        images.push(MyConst.originRoot+mapRoute[0].images[u].url)
      }

      var route = {
        'id'      : mapRoute[0].id,
        'step'    : 0,
        'name'    : mapRoute[0].name,
        'images'  : images[0],//de momento una
        'label'   : label_translation,
        'description' :  description_translation
      }

      slideData.push(route)

      for (var z = 0; z < mapRoute[0].places.length; z++) {

        var place = mapRoute[0].places[z]
        var desc = place.description

        for (var v = 0; v < desc.length; v++) {
          var place_description_translation = []
          var place_description = desc[v]
          if(place_description.language.code === lang){
            place_description_translation = desc[v]
          }
        }

        var theplace = {
          'id'      : place.id,
          'step'    : z+1,
          'name'    : place.name,
          'images'  : MyConst.originRoot+place.images[0].url,
          'label'   :  place_description_translation.label,
          'description' :  place_description_translation.description
        }

        slideData.push(theplace)

      }

    }

    return slideData

  }
  
  // First slide is the route cover::
  function renderSlides(mapRoute: any){
    return setSlidesData(mapRoute).map((slide: SlideRoute, i) => (
      <IonSlide
        key={i+'2'}>
        <IonCard 
          class='hob_card'>
          <IonCardContent>
            <img src={slide.images} alt={slide.images}/><br/>
            <IonTextarea
              class='hob_slide_textarea'
              disabled
              readonly
              value={slide.description}>
            </IonTextarea>
          </IonCardContent>
        </IonCard>
      </IonSlide>
    ))
  }

  function renderHeader(fullMenu: Menu[], mapRoute: any) {
    title = mapRoute[0] ? mapRoute[0].name : ''
    return fullMenu[0] ?
    <IonHeader class='hob-header'>
      <IonToolbar class='hob-header'>
        <IonItem
        class='hob-header border-none remove_inner_bottom'
        key='qwerjlhwer'>
        <IonImg
          class='back'
          onClick={() => history.goBack()}
          src={MyConst.icons.back}
          slot="start"
        ></IonImg>
        <IonThumbnail>
          <IonImg
            src={fullMenu[0].active_icon}
            alt={title}
          />
        </IonThumbnail>
        <IonGrid>
          <IonRow><IonCol><IonLabel class='header_title bold'>{(title).toUpperCase()}</IonLabel></IonCol></IonRow>
          <IonRow><IonCol><IonLabel class='header_subtitle'></IonLabel></IonCol></IonRow>
        </IonGrid>
      </IonItem>
      </IonToolbar>
    </IonHeader> : ''
  }

  // Change the header subtitle pending on slide 'hidden content'
  const setLabel = async (event: any, slides: SlideRoute[], label: any) => {
    let labelClass = '.header_subtitle'
    let index = 0
    await event.target.getActiveIndex().then((value: any) => (index=value))
    if(slides[index] !== undefined){

      let result = ''
      let now = jQuery(labelClass).html()

      if( slides[index].label !== undefined ){
        result += slides[index].label
      }

      /*if(slides[index].name !== ''){
        if(result !== '') result += ' - '        
        result += slides[index].label
      }*/

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

  return(
    <IonPage>         
      {renderHeader(fullMenu, mapRoute)}
      <IonContent>
        <IonSlides
          key='MySlides2'
          pager={true}
          options={slideOpts}
          onIonSlidesDidLoad={(event: any)=> setLabel(event, setSlidesData(mapRoute), title)}
          onIonSlideTransitionStart={(event: any)=> setLabel(event, setSlidesData(mapRoute), title)}
        >{renderSlides(mapRoute)}
        </IonSlides>
      </IonContent>
    </IonPage>
  )
  
}

export default RouteOverview