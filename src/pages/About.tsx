import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { airplaneOutline, airplaneSharp, checkmarkOutline, informationCircleOutline, informationCircleSharp, informationOutline, informationSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'
import { description, version } from '../../package.json';

import "../translations/i18n";
import './About.css';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
let _user: User | null = null


const About: React.FC = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Only run this one time!  No multiple subscriptions!
        supabaseAuthService.user.subscribe((user: User | null) => {
            _user = user
            console.log('Come: subscribed: _user', _user)
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
                <IonIcon size="large" ios={informationCircleOutline} md={informationCircleSharp}></IonIcon>
              &nbsp;&nbsp;{t('About Gringo Directory')}
            </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">

        Description: { description }<br/>
        Version: { version }<br/>
      </IonContent>
    </IonPage>
  );
};

export default About;
