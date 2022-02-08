import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { addOutline, addSharp, airplaneOutline, airplaneSharp, businessOutline, businessSharp, checkmarkOutline, informationCircleOutline, informationCircleSharp, informationOutline, informationSharp, people, peopleOutline, peopleSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { TableGrid } from 'ionic-react-tablegrid';
import { Org as OrgObject } from '../../models/Org'
import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'

// import description from '../../package.json';
// import version from '../../package.json';

import "../translations/i18n";
import './Orgs.css';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
let _user: User | null = null


const Orgs: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(true);
    const [ orgs, setOrgs ] = useState<any[]>([]);

    const loadOrgs = async () => {
        const { data, error } = await supabaseDataService.getOrgs();
        if (error) { 
            console.error('loadOrgs: error', error)
        } else {
            console.log('orgs', data);
            const newOrgs: any[] = [];
            data.forEach((org: OrgObject) => {
                newOrgs.push({
                    "name^": org.name,
                    "$id": org.id,
                    "added^": org.created_at?.substring(0,10),
                    "updated^": org.updated_at?.substring(0,10),
                });
            });
            setOrgs(newOrgs);
        }
        setShowLoading(false);

    }
    useEffect(() => {
        // Only run this one time!  No multiple subscriptions!
        supabaseAuthService.user.subscribe((user: User | null) => {
            _user = user
            console.log('Come: subscribed: _user', _user)
        });
        loadOrgs();
    }, []) // <-- empty dependency array
    
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
            <IonTitle>
                <IonIcon size="large" ios={businessOutline} md={businessSharp}></IonIcon>
              &nbsp;&nbsp;{t('orgs')}
            </IonTitle>
            <IonButtons slot='end'>
                <IonButton color='dark' onClick={() => {history.push('/org/new')}}>
                    <IonIcon size='large' ios={addOutline} md={addSharp}></IonIcon>
                </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">

      <IonLoading isOpen={showLoading} message={t('Loading')} />

        <TableGrid rowStyle={{cursor: 'pointer'}}
            rows={orgs} 
            setRows={setOrgs}
            rowClick={(row: any, index: number)=>{history.push(`/org/${row.$id}`)}}
        />

        <IonGrid key={'orgsList'}>
            {orgs.map((org: OrgObject) => {
                return (
                    <IonRow key={org.id} onClick={()=>{history.push(`/org/${org.id}`)}}>
                        <IonCol>
                            <IonLabel>
                                {`${org.name || ''}`}
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

export default Orgs;
