import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { SupabaseAuthService } from 'ionic-react-supabase-login';
import { addOutline, addSharp, airplaneOutline, airplaneSharp, checkmarkOutline, informationCircleOutline, informationCircleSharp, informationOutline, informationSharp, peopleOutline, peopleSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import { Person as PersonObject } from '../../models/Person'
import SupabaseDataService from '../services/supabase.data.service'

// import description from '../../package.json';
// import version from '../../package.json';

import "../translations/i18n";
import './People.css';

const supabaseDataService = SupabaseDataService.getInstance()

const People: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(true);
    const [ people, setPeople ] = useState<PersonObject[]>([]);

    const loadPeople = async () => {
        const { data, error } = await supabaseDataService.getPeople();
        if (error) { 
            console.error('loadPeople: error', error)
        } else {
            setPeople(data);
        }
        setShowLoading(false);

    }
    const [ user, setUser ] = useState<any>(null);
    const [ profile, setProfile ] = useState<any>(null);
    useEffect(() => {
        loadPeople();
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
                <IonIcon size="large" ios={peopleOutline} md={peopleSharp}></IonIcon>
              &nbsp;&nbsp;{t('people')}
            </IonTitle>
            <IonButtons slot='end'>
                <IonButton color='dark' onClick={() => {history.push('/person/new')}}>
                    <IonIcon size='large' ios={addOutline} md={addSharp}></IonIcon>
                </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">

      <IonLoading isOpen={showLoading} message={t('Loading')} />

        <IonGrid key={'peopleList'}>
            {people.map((person: PersonObject) => {
                return (
                    <IonRow key={person.id} onClick={()=>{history.push(`/person/${person.id}`)}}>
                        <IonCol>
                            <IonLabel>
                                {`${person.firstname || ''} ${person.middlename || ''} ${person.lastname || ''}`}
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                )
            })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default People;
