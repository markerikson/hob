import * as MyConst from "../static/constants"
import React, { useEffect, useState } from "react"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonImg,
  IonLabel,
  IonButton,
  IonThumbnail,
  useIonViewWillEnter,  
  /*
  IonToast,
  IonList,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillLeave,
  */
} from "@ionic/react"
import { RouteComponentProps, useHistory } from "react-router"
import { SubMenu, SubMenuItem } from "./Styles"

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from "jquery"

// Translations...
import { useTranslation } from "react-i18next"

// Models...
import { Menu } from "../models/Menu"
import { Submenu } from "../models/Submenu"

interface PageProps
  extends RouteComponentProps<{
    slug: string
  }> {}

const LiveMenu: React.FC<PageProps> = ({ match }) => {

  const { t } = useTranslation()
  const history = useHistory()

  //var creator_id = localStorage.getItem("creator::id")
  useIonViewWillEnter(() => {
    toggleFooter()
  })

  const [fullMenu, setMenu] = useState<Menu[]>([])
  useEffect(() => {
    fetch(MyConst.menuDump + match.params.slug + ".json")
      .then((res) => res.json())
      .then(setMenu)
  }, [match.params.slug])

  const [subMenus, setMenus] = useState<Submenu[]>([])
  useEffect(() => {
    fetch(MyConst.subMenuDump + match.params.slug + ".json")
      .then((res) => res.json())
      .then(setMenus)
  }, [match.params.slug])

  var pageSlug = 'train-yourself'
  if(fullMenu[0] !== undefined){
    pageSlug = fullMenu[0].slug
  }

  function renderHeader(fullMenu: Menu[]) { 
    hoverFooterIcon(fullMenu)
    return fullMenu.map((r: Menu, i) =>
      r.has_main && ( r.slug === "train-yourself" || r.slug === 'explore-and-equip' ) ? (
        <div
          key={"head_" + r.slug}
          style={{
            width: "100%",
            background: "#FFF",//TODO: Unforce the background to don't hurt light|dark!
            height: 45,
            display: "flex",
            borderBottomColor: "none",
            fontWeight: 'bold',
            opacity: 1
          }}
        >
          <IonImg
            key="hob_head_back"
            class="hob_head_back"
            src={MyConst.icons.back}
            onClick={() => history.goBack()}
            slot="start"
          ></IonImg>
        </div>
      ) : r.slug !== "home" ? (
        <IonHeader 
          key={"head_" + r.slug}
          class="hob-header">
          <IonToolbar class="hob-header">
            <IonItem
              key={"head_item_" + r.slug}
              class="hob-header border-none remove_inner_bottom">
              <IonImg
                class='back'
                onClick={() => history.goBack()}
                src={MyConst.icons.back}
                slot="start"
              ></IonImg>
              <IonThumbnail>
                <IonImg src={r.active_icon} alt={r.slug} />
              </IonThumbnail>
              <IonLabel key={"header-label" + r.slug} class='h1 bold'>{t(r.name)}</IonLabel>
            </IonItem>
          </IonToolbar>
        </IonHeader>
      ) : (
        ""
      )
    )
  }

  function renderSubMenus(subMenus: Submenu[], pageSlug: any) {
    return subMenus.map((r: Submenu, index) =>
      !r.active_icon ? (
        <IonButton
          class="hob_menu_button"
          key={'submenu_'+r.resource}
          color={r.background_color}          
          href={r?.resource}
          expand="block"
        >{/*onClick={() => history.push(`/${r?.resource}`)}*/}
          {t(r.name)}
        </IonButton>
      ) : (
        <SubMenuItem
          key={'submenu_'+r.resource}
          onClick={() => history.push( ((pageSlug === '--home') ? `${r?.access}` : `/${r?.resource}`))}
          className='hob_submenu_icon'
          >
          <img
            key={r.resource}
            src={r.active_icon}
            alt=""
            height="auto"
            max-height="250px"
          />
          <IonLabel class='bold'>{t(r.name)}</IonLabel>
        </SubMenuItem>
      )
    )
  }

  // Show and hide the footer over LiveMenu
  function toggleFooter(){
    if(MyConst.JustTesting) console.info('Toggle footer! (LiveMenu::useIonViewWillEnter)')
    if( MyConst.menuSettings.hiddenFooter.indexOf(window.location.pathname) === -1){      
      jQuery('.hob-footer').removeClass('hidden')
    }else{
      jQuery('.hob-footer').addClass('hidden')
    }
  }

  // Select the footer hover icon
  function hoverFooterIcon(menus: Menu[]) {
    if(MyConst.holdHoverFooterIcon.indexOf(window.location.pathname) !== -1){        
      if(jQuery('#navigate').attr('src') !== undefined){
        if( jQuery('#navigate').attr('src') === jQuery('#navigate').data('active')){
          jQuery('#navigate').attr('src', jQuery('#navigate').data('inactive'))
        }
      }
      if (menus[0] !== undefined){
        let subArea = window.location.pathname.split("/")[2]
        let icon =
          menus[0].slug === subArea
            ? menus[0].active_icon
            : menus[0].inactive_icon
        jQuery("#" + menus[0].slug).attr("src", icon)
      }
    }
  }

  return (
    <IonPage>
      {renderHeader(fullMenu)}
      <IonContent>
        <SubMenu>
          {renderSubMenus(subMenus, pageSlug)}
        </SubMenu>
      </IonContent>
    </IonPage>
  )
}

export default LiveMenu