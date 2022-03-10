import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { SupabaseAuthService } from 'ionic-react-supabase-login';
import { airplaneOutline, airplaneSharp, checkmarkOutline, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SupabaseDataService from '../services/supabase.data.service'

import "../translations/i18n";
import './Come.css';

const supabaseDataService = SupabaseDataService.getInstance()
let _user: User | null = null


const Come: React.FC = () => {
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
                <IonIcon size="large" ios={airplaneOutline} md={airplaneSharp}></IonIcon>
              &nbsp;&nbsp;{t('Come to Manta')}
            </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
          <IonGrid>
              <IonRow>
                    <IonCol size="2">
                    </IonCol>
                    <IonCol size="8" className="ion-text-center">
                    <h2>What do you want to do?</h2>
                                        </IonCol>
                    <IonCol size="2">
                    </IonCol>
            </IonRow>
            <IonRow>
                    <IonCol size="2">
                    </IonCol>
                    <IonCol size="8">
                    <IonButton strong expand="block">Arrange Flights</IonButton>
                    </IonCol>
                    <IonCol size="2">
                    </IonCol>
            </IonRow>
            <IonRow>
                    <IonCol size="2">
                    </IonCol>
                    <IonCol size="8">
                    <IonButton strong expand="block">Get Transportation</IonButton>
                    </IonCol>
                    <IonCol size="2">
                    </IonCol>
            </IonRow>
            </IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default Come;
