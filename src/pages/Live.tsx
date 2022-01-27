import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { airplaneOutline, airplaneSharp, checkmarkOutline, homeOutline, homeSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'

import "../translations/i18n";
import './Live.css';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
let _user: User | null = null


const Live: React.FC = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Only run this one time!  No multiple subscriptions!
        supabaseAuthService.user.subscribe((user: User | null) => {
            _user = user
            console.log('Live: subscribed: _user', _user)
        })
    }, []) // <-- empty dependency array
    
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
