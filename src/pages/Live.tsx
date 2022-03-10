import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { SupabaseAuthService } from 'ionic-react-supabase-login';
import { airplaneOutline, airplaneSharp, checkmarkOutline, homeOutline, homeSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SupabaseDataService from '../services/supabase.data.service'

import "../translations/i18n";
import './Live.css';

const supabaseDataService = SupabaseDataService.getInstance()


const Live: React.FC = () => {
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
                <IonIcon size="large" ios={homeOutline} md={homeSharp}></IonIcon>
              &nbsp;&nbsp;{t('Live in Manta')}
            </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
            <div className="ion-padding">placeholder</div>
      </IonContent>
    </IonPage>
  );
};

export default Live;
