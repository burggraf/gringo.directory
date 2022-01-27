import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { checkmarkOutline, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'

import "../translations/i18n";
import './ProfileOLD.css';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
let _user: User | null = null


const Profile: React.FC = () => {
    const { t } = useTranslation();

    const [profile, setProfile] = useState({ id: '', name: ''});
    const save = async () => {
        if (!profile.id) {
            setProfile({...profile, id: _user?.id!})  
        }
        const { data, error } = await supabaseDataService.saveProfile(profile);
        if (error) {
            console.error(error);
            return;
        }
        console.log('save returned', data);
    }

    const loadProfile = async () => {
        const { data, error } = await supabaseDataService.getProfile();
        if (error) {
            console.error(error);
            return;
        }
        console.log('load returned', data);
        setProfile(data);
    }
    useEffect(() => {
        // Only run this one time!  No multiple subscriptions!
        supabaseAuthService.user.subscribe((user: User | null) => {
            _user = user
            console.log('Profile: subscribed: _user', _user)
        })
        loadProfile();
    }, []) // <-- empty dependency array
    
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
            <IonTitle>
                <IonIcon size="large" ios={personOutline} md={personSharp}></IonIcon>
              &nbsp;&nbsp;{t('User Profile')}
            </IonTitle>
            <IonButtons slot="end">
                <IonButton color='primary' onClick={() => {
                                    save();
                                }}>
                                    <IonIcon size='large' icon={checkmarkOutline}></IonIcon>
                               </IonButton>                    

            </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
            <IonItem>
                <IonLabel slot="start">{t('Name')}</IonLabel>
                <IonInput type="text" 
                    placeholder={t('type your name here')} 
                    onIonChange={
                        (e: any) => 
                        setProfile({...profile, name: e.detail.value!})
                    }
                    value={profile.name} class="inputBox"></IonInput>
            </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
