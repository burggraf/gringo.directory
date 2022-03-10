import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { SupabaseAuthService } from 'ionic-react-supabase-login';
import { airplaneOutline, airplaneSharp, checkmarkOutline, fastFoodOutline, fastFoodSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SupabaseDataService from '../services/supabase.data.service'

import "../translations/i18n";
import './Welcome.css';

const supabaseDataService = SupabaseDataService.getInstance()


const Welcome: React.FC = () => {
    const { t } = useTranslation();

    const [ user, setUser ] = useState<any>(null);
    const [ profile, setProfile ] = useState<any>(null);
    useEffect(() => {
      const userSubscription = SupabaseAuthService.subscribeUser(setUser);
      const profileSubscription = SupabaseAuthService.subscribeProfile(setProfile);
      return () => {
          SupabaseAuthService.unsubscribeUser(userSubscription);
          SupabaseAuthService.unsubscribeProfile(profileSubscription);
      }
    },[])
        
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
            <IonTitle>
              <IonIcon style={{verticalAlign: 'top', marginTop: '10px'}} src='/assets/logo.svg' size='large'></IonIcon>
              <IonLabel style={{verticalAlign: 'bottom', color:'#D35C23', fontSize: '16pt', fontWeight: 'bold'}}>&nbsp;&nbsp;Welcome to Gringo Directory</IonLabel>
            </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

            {/* <IonIcon style={{verticalAlign: 'top', marginTop: '10px'}} src='/assets/logo.svg' size='large'></IonIcon>
						<IonLabel style={{verticalAlign: 'bottom', color:'#D35C23', fontSize: '20pt', fontWeight: 'bold'}}>&nbsp;&nbsp;Gringo Directory</IonLabel> */}

            <div className="ion-padding">
              Welcome Page
            </div>

      </IonContent>
    </IonPage>
  );
};

export default Welcome;
