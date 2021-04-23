import * as MyConst from "../static/constants";
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonImg,
  IonLabel,
  IonButton,
  IonThumbnail,
} from "@ionic/react";
import { RouteComponentProps, useHistory } from "react-router";
import { SubMenu, SubMenuItem } from "./Styles";

// Ohhh!!! :D :D This code looks happy now ^_^
import jQuery from "jquery";

// Translations...
import { useTranslation } from "react-i18next";

// Models...
import { Menu } from "../models/Menu";
import { Submenu } from "../models/Submenu";

interface FooterMenuProps
  extends RouteComponentProps<{
    slug: string;
  }> {}

const LiveMenu: React.FC<FooterMenuProps> = ({ match }) => {
  const { t } = useTranslation();

  const history = useHistory();

  const [full_menu, setMenu] = useState<Menu[]>([]);
  useEffect(() => {
    fetch(MyConst.menuDump + match.params.slug + ".json")
      .then((res) => res.json())
      .then(setMenu);
  }, [match.params.slug]);

  const [sub_menus, setMenus] = useState<Submenu[]>([]);
  useEffect(() => {
    fetch(MyConst.subMenuDump + match.params.slug + ".json")
      .then((res) => res.json())
      .then(setMenus);
  }, [match.params.slug]);

  function renderSubMenus(menus: Submenu[], full_menu: Menu[]) {
    var result = menus.map((r: Submenu, index) =>
      !r.active_icon ? (
        <IonButton
          class="hob_menu_button"
          key={r.resource}
          color={r.background_color}
          href={r.resource}
          expand="block"
        >
          {t(r.name)}
        </IonButton>
      ) : (
        <SubMenuItem
          key={r.resource}
          onClick={() => history.push(`/${r?.resource}`)}
        >
          <img
            key={r.resource}
            src={r.active_icon}
            alt=""
            height="auto"
            max-height="250px"
          />
          <IonLabel>{t(r.name)}</IonLabel>
        </SubMenuItem>
      )
    );
    return result;
  }

  function renderHeader(full_menu: Menu[]) {
    hoverFooterIcon(full_menu);

    var result = full_menu.map((r: Menu, i) =>
      r.has_main && r.slug === "train-yourself" ? (
        <div
          style={{
            width: "100%",
            background: "#FFF",
            height: 63,
            display: "flex",
            borderBottomColor: "none",
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
        <IonHeader class="hob-header">
          <IonToolbar class="hob-header">
            <IonItem key={"head_" + r.slug} class="hob-header border-none">
              <IonImg
                onClick={() => history.goBack()}
                src={MyConst.icons.back}
                slot="start"
              ></IonImg>
              <IonThumbnail>
                <IonImg src={r.active_icon} alt={""} />
              </IonThumbnail>
              <IonLabel key={"header-label" + r.slug}>{t(r.name)}</IonLabel>
            </IonItem>
          </IonToolbar>
        </IonHeader>
      ) : (
        ""
      )
    );

    return result;
  }

  // TODO: Is fine, but... if i can find the react way ^^ would be nice jiji (try with something like match!!!!)
  function hoverFooterIcon(menus: Menu[]) {
    if (menus[0] !== undefined) {
      let icon =
        menus[0].slug === window.location.pathname.split("/")[2]
          ? menus[0].active_icon
          : menus[0].inactive_icon;
      jQuery("#" + menus[0].slug).attr("src", icon);
    }
  }

  var creator_id = localStorage.getItem("creator::id");
  if (
    MyConst.menuSettings.freeAccess.indexOf(window.location.pathname) !== -1
  ) {
    console.log("You have free access here!! :)");
  } else {
    if (creator_id !== null) {
      console.log("Hello you have granted access, " + creator_id);
    } else {
      //alert("You don't have acces to this area...");
      //window.location.href = "/Access/train-yourself";
    }
  }

  return (
    <IonPage>
      {renderHeader(full_menu)}
      <IonContent>
        <SubMenu>{renderSubMenus(sub_menus, full_menu)}</SubMenu>
      </IonContent>
    </IonPage>
  );
};

export default LiveMenu;
