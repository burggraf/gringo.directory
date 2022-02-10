import { IonButton, IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { addOutline, addSharp, airplaneOutline, airplaneSharp, businessOutline, businessSharp, checkmarkOutline, informationCircleOutline, informationCircleSharp, informationOutline, informationSharp, people, peopleOutline, peopleSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { TableGrid } from 'ionic-react-tablegrid';
import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'
import { categories } from '../data/categories';

// import description from '../../package.json';
// import version from '../../package.json';

import "../translations/i18n";
import './Places.css';
import Chiplist from '../components/Chiplist';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
let _user: User | null = null


const Places: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false);
    const [ places, setPlaces ] = useState<any[]>([]);
    const [ selectedCategories, setSelectedCategories ] = useState<string[]>(JSON.parse(localStorage.getItem('places:selectedCategories') || '[]'));
    const [ searchMode, setSearchMode ] = useState<string>(localStorage.getItem('places:searchMode') || 'ALL');
    const loadPlaces = async () => {
        setShowLoading(true);
        const { data, error } = await supabaseDataService.getPlaces();
        if (error) { 
            console.error('loadPlaces: error', error)
        } else {
            console.log('got places', data);
            const newPlaces: any[] = [];
            data.forEach((place: any) => {
                newPlaces.push({
                    "name^": place.name,
                    "$id": place.place_id,
                    // "added^": (new Date(place.created_at+'Z')).toLocaleString(),
                    // "updated^": (new Date(place.updated_at+'Z')).toLocaleString(),
                    
                    //place.updated_at?.substring(0,16).replace('T', ' '),
                });
            });
            setPlaces(newPlaces);
        }
        setShowLoading(false);

    }
    useEffect(() => {
        // Only run this one time!  No multiple subscriptions!
        supabaseAuthService.user.subscribe((user: User | null) => {
            _user = user
            console.log('Come: subscribed: _user', _user)
        });
        //loadPlaces();
    }, []) // <-- empty dependency array
    
    useEffect(() => {
        loadPlaces();
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
              &nbsp;&nbsp;{t('Places')}
            </IonTitle>
            <IonButtons slot='end'>
                <IonButton color='dark' onClick={() => {history.push('/place/new')}}>
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
            localStorage.setItem('places:searchMode', newSearchMode)
        }}>{searchMode}</IonChip>
        <IonLabel>Categories:</IonLabel>
        <Chiplist 
                            key={'places:selectedCategoriesChiplist'}
                            title={t('Categories')}
                            id={'categories'}                            
                            options={categories}
                            index={-1}
                            data={selectedCategories} 
                            saveFunction={(newData: string[])=>{
                                setSelectedCategories(newData);
                                localStorage.setItem('places:selectedCategories', JSON.stringify(newData));
                            }}/>


        <TableGrid rowStyle={{cursor: 'pointer'}}
            rows={places} 
            setRows={setPlaces}
            rowClick={(row: any, index: number)=>{history.push(`/place/${row.$id}`)}}
        />

      </IonContent>
    </IonPage>
  );
};

export default Places;
