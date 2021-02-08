import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonAvatar, IonChip,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  title: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  submenu: object;
}

const appTraining: AppPage[] = [
  {
    title: 'Training',
    url: '/page/Training',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    submenu: [{
      title: 'Train yourself',
      url: '/page/Inbox',
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    }]
  },
  {
    title: 'Controlls',
    url: '/page/Controlls',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
    submenu: [{
      title: 'Train yourself',
      url: '/page/Inbox',
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    }]
  },
  {
    title: 'Maneuvers',
    url: '/page/Maneuvers',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    submenu: [{
      title: 'Train yourself',
      url: '/page/Inbox',
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    }]
  },
  {
    title: 'Navigate',
    url: '/page/Navigate',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
    submenu: [{
      title: 'Train yourself',
      url: '/page/Navigate',
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    }]
  },
  {
    title: 'Emergencies',
    url: '/page/Emergencies',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
    submenu: [{
      title: 'Train yourself',
      url: '/page/Inbox',
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    }]
  }
];

const Menu: React.FC = () => {

  const location = useLocation();

  return (
    <IonMenu side="start" menuId="first" contentId="main" type="overlay">
      <IonContent>
        <IonItem>
          <IonAvatar slot="start">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />         
          </IonAvatar>
          <IonLabel>Client name</IonLabel>
        </IonItem>
        <IonList id="inbox-list">
          <IonListHeader>Menu</IonListHeader>
          <IonNote>Select an option...</IonNote>
          <IonMenuToggle autoHide={true}>
            {appTraining.map((appPage, index) => {
              return (
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              );
            })}
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );

};

export default Menu;