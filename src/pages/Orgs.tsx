import { IonButton, IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { SupabaseAuthService, User } from 'ionic-react-supabase-login';
import { TableGrid } from 'ionic-react-tablegrid';
import { addOutline, addSharp, airplaneOutline, airplaneSharp, businessOutline, businessSharp, checkmarkOutline, informationCircleOutline, informationCircleSharp, informationOutline, informationSharp, people, peopleOutline, peopleSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import { Org as OrgObject } from '../../models/Org'
import Chiplist from '../components/Chiplist';
import { categories } from '../data/categories';
import SupabaseDataService from '../services/supabase.data.service'

// import description from '../../package.json';
// import version from '../../package.json';

import "../translations/i18n";
import './Orgs.css';

const supabaseDataService = SupabaseDataService.getInstance()


const Orgs: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false);
    const [ orgs, setOrgs ] = useState<any[]>([]);
    const [ selectedCategories, setSelectedCategories ] = useState<string[]>(JSON.parse(localStorage.getItem('orgs:selectedCategories') || '[]'));
    const [ searchMode, setSearchMode ] = useState<string>(localStorage.getItem('orgs:searchMode') || 'ALL');
    const loadOrgs = async () => {
        setShowLoading(true);
        const { data, error } = await supabaseDataService.getOrgs(selectedCategories, searchMode);
        if (error) { 
            console.error('loadOrgs: error', error)
        } else {
            console.log('got orgs', data);
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
    const [ user, setUser ] = useState<User | null>(null);
    const [ profile, setProfile ] = useState<any>(null);
    useEffect(() => {
      const userSubscription = SupabaseAuthService.subscribeUser(setUser);
      const profileSubscription = SupabaseAuthService.subscribeProfile(setProfile);
      return () => {
          SupabaseAuthService.unsubscribeUser(userSubscription);
          SupabaseAuthService.unsubscribeProfile(profileSubscription);
      }
    },[])
    
    useEffect(() => {
        loadOrgs();
    }, [selectedCategories, searchMode]);
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
        <IonChip key={'searchMode'}
          onClick={()=>{
            const newSearchMode = (searchMode === 'ALL' ? 'ANY' : 'ALL');
            setSearchMode(newSearchMode)
            localStorage.setItem('orgs:searchMode', newSearchMode)
        }}>{searchMode}</IonChip>
        <IonLabel>Categories:</IonLabel>
        <Chiplist 
                            key={'orgs:selectedCategoriesChiplist'}
                            title={t('Categories')}
                            id={'categories'}                            
                            options={categories}
                            index={-1}
                            //data={org?.categories! || []} 
                            data={selectedCategories} 
                            saveFunction={(newData: string[])=>{
                                setSelectedCategories(newData);
                                localStorage.setItem('orgs:selectedCategories', JSON.stringify(newData));
                            }}/>


        <TableGrid rowStyle={{cursor: 'pointer'}}
            rows={orgs} 
            setRows={setOrgs}
            rowClick={(row: any, index: number)=>{history.push(`/org/${row.$id}`)}}
        />

        {/* <IonGrid key={'orgs:List'}>
            {orgs.map((org: OrgObject) => {
                return (
                    <IonRow key={`orgs:org.row.id.${org.id}`} onClick={()=>{history.push(`/org/${org.id}`)}}>
                        <IonCol>
                            <IonLabel>
                                {`${org.name || ''}`}
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                )
            })}
        </IonGrid> */}
      </IonContent>
    </IonPage>
  );
};

export default Orgs;
