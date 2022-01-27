import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Privacy.css';

const Privacy: React.FC = () => {

  // const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/login' />
          </IonButtons>
          <IonTitle>Privacy Policy</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
      Privacy policy screen here...
      <br/><br/>
      <IonButton strong fill="outline" color="medium" size="small" routerLink="/delete" routerDirection="forward">Delete My Data</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Privacy;
