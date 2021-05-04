import React, { useState, useRef } from 'react';
import {IonSegment,IonSegmentButton,IonRow,IonCol,IonGrid,IonContent,IonSlides, 
        IonSlide,IonHeader, IonPage, IonTitle, 
        IonToolbar,IonButtons,IonMenuButton,IonSearchbar} from '@ionic/react';

//import Segment from '../components/Segment';
const Segment: React.FC = () => {

  const [searchText, setSearchText] = useState('');

  // a ref variable to handle the current slider
  const slider = useRef<HTMLIonSlidesElement>(null);
  // a state value to bind segment value
  const [value, setValue] = useState("0");

  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
    pagination: {
      el: null
    },
  
  };

  // a function to handle the segment changes
  const handleSegmentChange = (e: any) => {
    setValue(e.detail.value);
    slider.current!.slideTo(e.detail.value);
  };

  // a function to handle the slider changes
  const handleSlideChange = async (event: any) => {
    let index: number = 0;
    await event.target.getActiveIndex().then((value: any) => (index=value));
    setValue(''+index)
  }

 
return (
<IonPage>

<IonHeader>
  <IonToolbar>
    <IonButtons slot="start">
      <IonMenuButton />
    </IonButtons>
    <IonTitle>Market</IonTitle>
  </IonToolbar>
</IonHeader>

<IonHeader>
        <IonToolbar>
          <IonTitle>Search Package</IonTitle>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
          {/*-- Segment in a toolbar --*/}
          {/*-- the value is binded to state value and is updated every time setValue is running --*/}
          {/*-- buttons values are set to 0 and 1, to match slider index, it can be whatever you need but there mas be a table --*/}
          <IonSegment value={value} onIonChange={(e) => handleSegmentChange(e)} >
            <IonSegmentButton value="0">
              <IonTitle>Market</IonTitle>
            </IonSegmentButton>
            <IonSegmentButton value="1">
              <IonTitle>My Package</IonTitle>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
      {/*-- Market Segment --*/}
    {/*-- the ref method binds this slider to slider variable --*/}
      <IonSlides pager={true} options={slideOpts} onIonSlideDidChange={(e) => handleSlideChange(e)} ref={slider}>>
      <IonSlide>
      <IonGrid>
      <IonRow>
        <IonCol>Card</IonCol>
        <IonCol>Card</IonCol>
        <IonCol>Card</IonCol>
      </IonRow>
      </IonGrid>
      </IonSlide>
      {/*-- Package Segment --*/}
      <IonSlide>
      <IonGrid>
      <IonRow>
        <IonCol>Card</IonCol>
        <IonCol>Card</IonCol>
        <IonCol>Card</IonCol>
        <IonCol>Card</IonCol>
      </IonRow>
      </IonGrid>
      </IonSlide>
    </IonSlides>
  </IonContent>
</IonPage>
)
}

export default Segment;