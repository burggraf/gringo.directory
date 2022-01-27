import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Terms.css';

const Terms: React.FC = () => {

  // const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/login' />
          </IonButtons>
          <IonTitle>Terms of Service</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
      Terms of Service screen here...
      </IonContent>
    </IonPage>
  );
};

export default Terms;
