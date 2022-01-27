import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { airplaneOutline, airplaneSharp, checkmarkOutline, fastFoodOutline, fastFoodSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'

import "../translations/i18n";
import './Welcome.css';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
let _user: User | null = null


const Welcome: React.FC = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Only run this one time!  No multiple subscriptions!
        supabaseAuthService.user.subscribe((user: User | null) => {
            _user = user
            console.log('Enjoy: subscribed: _user', _user)
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
