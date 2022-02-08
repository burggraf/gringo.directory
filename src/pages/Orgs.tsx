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
import { categories } from '../data/categories';

// import description from '../../package.json';
// import version from '../../package.json';

import "../translations/i18n";
import './Orgs.css';
import Chiplist from '../components/Chiplist';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
let _user: User | null = null


const Orgs: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false);
    const [ orgs, setOrgs ] = useState<any[]>([]);
    const [ selectedCategories, setSelectedCategories ] = useState<string[]>([]);

    const loadOrgs = async () => {
        setShowLoading(true);
        const { data, error } = await supabaseDataService.getOrgs(selectedCategories);
        if (error) { 
            console.error('loadOrgs: error', error)
        } else {
            console.log('orgs', data);
            const newOrgs: any[] = [];
            data.forEach((org: OrgObject) => {
                newOrgs.push({
                    "name^": org.name,
                    "$id": org.id,
                    "added^": (new Date(org.created_at+'Z')).toLocaleString(),
                    "updated^": (new Date(org.updated_at+'Z')).toLocaleString(),
                    
                    //org.updated_at?.substring(0,16).replace('T', ' '),
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
        //loadOrgs();
    }, []) // <-- empty dependency array
    
    useEffect(() => {
        loadOrgs();
    }, [selectedCategories]);
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

        <IonLabel>Categories:</IonLabel>
        <Chiplist 
                            title={t('Categories')}
                            id={'categories'}                            
                            options={categories}
                            index={-1}
                            //data={org?.categories! || []} 
                            data={selectedCategories} 
                            saveFunction={(newData: string[])=>{
                                setSelectedCategories(newData);
                            }}/>


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
