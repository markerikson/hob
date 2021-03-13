import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonToolbar, IonCard, IonCardHeader, IonTitle, IonContent, IonSlides, IonSlide, IonButtons, IonBackButton, IonItem } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

import { AppContent } from '../models.new/AppContent'
import { Language } from '../models.new/Language'
import { Article } from '../models.new/Article'
import { ArtPage } from '../models.new/ArtPage'
import { Image } from '../models.new/Image'

interface AppContentProps extends RouteComponentProps<{
  slug: string
}> {}

const Sandbox3: React.FC<AppContentProps> = ({match}) => {
  /*  
  const app_content = [{
    "id": 1,
    "name": "Solid hull",
    "created_at": "2021-02-20T23:47:34.000Z",
    "updated_at": "2021-03-02T23:12:38.000Z",
    "slug": "solid-hull",
    "articles": [
      {
        "id": 5,
        "language": {
          "id": 1,
          "name": "English (UK)",
          "code": "en",
          "published_at": "2021-02-20T04:46:51.000Z",
          "created_at": "2021-02-20T04:46:47.000Z",
          "updated_at": "2021-03-03T23:52:51.000Z"
        },
        "title": "Solid hull",
        "extra_content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        "pages": [
          {
            "id": 20,
            "title": "Titlewerwqr",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
            "image": {
              "id": 73,
              "name": "4.1.1.Inflatable.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_1_Inflatable_371fc815aa",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 4.72,
              "url": "/uploads/4_1_1_Inflatable_371fc815aa.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-03-01T23:04:50.000Z",
              "updated_at": "2021-03-01T23:04:50.000Z"
            }
          },
          {
            "id": 21,
            "title": "rethyreyhr",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
            "image": {
              "id": 74,
              "name": "4.1.3.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_3_a2c80cd123",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 5.86,
              "url": "/uploads/4_1_3_a2c80cd123.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-03-01T23:04:50.000Z",
              "updated_at": "2021-03-01T23:04:50.000Z"
            }
          }
        ]
      },
      {
        "id": 6,
        "language": {
          "id": 2,
          "name": "Spanish (ES)",
          "code": "es",
          "published_at": "2021-02-20T04:47:09.000Z",
          "created_at": "2021-02-20T04:47:05.000Z",
          "updated_at": "2021-03-03T23:52:57.000Z"
        },
        "title": "Embarcación sólida",
        "extra_content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        "pages": [
          {
            "id": 22,
            "title": "frdgdfsg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
            "image": {
              "id": 74,
              "name": "4.1.3.svg",
              "alternativeText": "",
              "caption": "",
              "width": 800,
              "height": 800,
              "formats": null,
              "hash": "4_1_3_a2c80cd123",
              "ext": ".svg",
              "mime": "image/svg+xml",
              "size": 5.86,
              "url": "/uploads/4_1_3_a2c80cd123.svg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "created_at": "2021-03-01T23:04:50.000Z",
              "updated_at": "2021-03-01T23:04:50.000Z"
            }
          }
        ]
      }
    ],
    "icon": {
      "id": 3,
      "name": "4.1.1.Solid.svg",
      "alternativeText": "",
      "caption": "",
      "width": 800,
      "height": 800,
      "formats": null,
      "hash": "4_1_1_Solid_a5e33c7d44",
      "ext": ".svg",
      "mime": "image/svg+xml",
      "size": 11.2,
      "url": "/uploads/4_1_1_Solid_a5e33c7d44.svg",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "created_at": "2021-02-20T22:52:45.000Z",
      "updated_at": "2021-02-20T22:52:45.000Z"
    },
    "media": [
      {
        "id": 78,
        "name": "4.1.3.D.1metre.svg",
        "alternativeText": "",
        "caption": "",
        "width": 800,
        "height": 800,
        "formats": null,
        "hash": "4_1_3_D_1metre_51d29909e8",
        "ext": ".svg",
        "mime": "image/svg+xml",
        "size": 39.14,
        "url": "/uploads/4_1_3_D_1metre_51d29909e8.svg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "created_at": "2021-03-01T23:04:50.000Z",
        "updated_at": "2021-03-01T23:04:50.000Z"
      },
      {
        "id": 79,
        "name": "4.1.3.D.5 metres.svg",
        "alternativeText": "",
        "caption": "",
        "width": 800,
        "height": 800,
        "formats": null,
        "hash": "4_1_3_D_5_metres_d087ddeac9",
        "ext": ".svg",
        "mime": "image/svg+xml",
        "size": 67.88,
        "url": "/uploads/4_1_3_D_5_metres_d087ddeac9.svg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "created_at": "2021-03-01T23:04:50.000Z",
        "updated_at": "2021-03-01T23:04:50.000Z"
      },
      {
        "id": 80,
        "name": "4.1.3.D.3 metres.svg",
        "alternativeText": "",
        "caption": "",
        "width": 800,
        "height": 800,
        "formats": null,
        "hash": "4_1_3_D_3_metres_4bf02be4f0",
        "ext": ".svg",
        "mime": "image/svg+xml",
        "size": 56.25,
        "url": "/uploads/4_1_3_D_3_metres_4bf02be4f0.svg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "created_at": "2021-03-01T23:04:50.000Z",
        "updated_at": "2021-03-01T23:04:50.000Z"
      },
      {
        "id": 81,
        "name": "4.1.3.B-3.svg",
        "alternativeText": "",
        "caption": "",
        "width": 800,
        "height": 800,
        "formats": null,
        "hash": "4_1_3_B_3_21502d23ae",
        "ext": ".svg",
        "mime": "image/svg+xml",
        "size": 160.81,
        "url": "/uploads/4_1_3_B_3_21502d23ae.svg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "created_at": "2021-03-01T23:04:50.000Z",
        "updated_at": "2021-03-01T23:04:50.000Z"
      }
    ]
  }]

  const [app_content, setAppContent] = useState<AppContent[]>([])
  useEffect(() => {
    fetch('http://hoponboard.eu:1337/app-contents/1').then(res => res.json()).then(setAppContent)
  }, [match.params.slug])

  function renderTitle(content: AppContent[]){
    return content.map((r: AppContent, index) => (
      <IonItem>{r.name}</IonItem>
    ))
  }
  */
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
        {/*renderTitle(app_content)*/}
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  )
}

export default Sandbox3