import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './DeleteAccount.css';

const DeleteAccount: React.FC = () => {

  // const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/login' />
          </IonButtons>
          <IonTitle>Delete Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
      Delete My Account screen here...
      </IonContent>
    </IonPage>
  );
};

export default DeleteAccount;
