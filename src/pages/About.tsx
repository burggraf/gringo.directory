import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
// import { SupabaseAuthService } from '@supabase/supabase-js'
import { SupabaseAuthService } from 'ionic-react-supabase-login';
import { airplaneOutline, airplaneSharp, checkmarkOutline, informationCircleOutline, informationCircleSharp, informationOutline, informationSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import info from '../../package.json';
// import version from '../../package.json';
//import { description, version } from '../../package.json';
//import description from '../../package.json'
//import version from '../../package.json'
import SupabaseDataService from '../services/supabase.data.service'

import "../translations/i18n";
import './About.css';

const supabaseDataService = SupabaseDataService.getInstance()


const About: React.FC = () => {
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
                <IonIcon size="large" ios={informationCircleOutline} md={informationCircleSharp}></IonIcon>
              &nbsp;&nbsp;{t('About Gringo Directory')}
            </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">

        Description: { info.description }<br/>
        Version: { info.version }<br/>
      </IonContent>
    </IonPage>
  );
};

export default About;
