import { IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { businessOutline, businessSharp, checkmarkOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import { Address as AddressObject } from '../../models/Models';
import Address from '../components/Address';
import GenericItemArrayEntry from '../components/GenericItemArrayEntry';
import Chiplist from '../components/Chiplist';
import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'
import UtilityFunctionsService from '../services/utility.functions.service';

import CommentsList from '../components/CommentsList';

import "../translations/i18n";
import './Place.css';
import { categories } from '../data/categories';
import { instantMessageTypes } from '../data/instantMessageTypes';
import { socialProfileTypes } from '../data/socialProfileTypes';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
const utils = UtilityFunctionsService.getInstance()
let _user: User | null = null

const Place: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(true);

    let { id } = useParams<{ id: string; }>();
    const isNew = (id === 'new');

    const initPlace: any = {
        id: id,
        name: '',
    }
	const [ place, setPlace ] = useState<any>(initPlace);

    const loadPlace = async (id: string) => {
        console.log('loadPlace...');
        const { data, error } = await supabaseDataService.getPlace(id);
        console.log('loadPlace...', data, 'error', error);
        if (error) {
            console.error('loadPlace error', error);
        } else {
            console.log('loadPlace data', data);
            setPlace(data);
        }
        setShowLoading(false);
    }



    useEffect(() => {
        // Only run this one time!  No multiple subscriptions!
        supabaseAuthService.user.subscribe((user: User | null) => {
            _user = user
            console.log('Enjoy: subscribed: _user', _user)
        });
        console.log('useEffect: id', id);
        if (id === 'new') {
            id = utils.uuidv4();
            setPlace({...initPlace, id: id});
            setShowLoading(false);
        } else {
            loadPlace(id);
        }    
        console.log('useEffect: id', id);
    }, []) // <-- empty dependency array
    
    const changeHandler = (e: any) => {
        const fld = e.srcElement.itemID;
        setPlace({ ...place, [fld]: e.detail.value! });
    }
    const saveItem = (id: string, data: any, index: number) => {
        const newPlace: any = {...place};
        if (!newPlace[id]) { newPlace[id] = []; }
        if (index === -1) { index = (newPlace[id].length); }
        newPlace[id][index] = data;
        setPlace(newPlace);
    }
    const deleteItem = (id: string, data: any, index: number) => {
        console.log('deleteItem', id, data, index);
        const newPlace: any = {...place};
        if (newPlace[id] && newPlace[id].length >= (index -1)) {
            newPlace[id].splice(index, 1);
        }
        setPlace(newPlace);
    }
    const savePlace = async () => {
        const { data, error } = await supabaseDataService.savePlace(place);
        console.log('savePlace: data', data, 'error', error);
    }

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/places" />
          </IonButtons>
            <IonTitle>
                <IonIcon size="large" ios={businessOutline} md={businessSharp}></IonIcon>
              &nbsp;&nbsp;{t('Edit Place Details')}
            </IonTitle>
            <IonButtons slot='end'>
                <IonButton color='primary' onClick={savePlace}>
                    <IonIcon size='large' icon={checkmarkOutline}></IonIcon>
                </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>

          <IonLoading isOpen={showLoading} message={t('Loading')} />
            <table className="tbl">
                <tbody>
                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('Name')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'Name'}
                            itemID='name'
							onIonChange={changeHandler}
							value={place?.name!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('Type')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'Type'}
                            itemID='type'
							onIonChange={changeHandler}
							value={place?.type!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('Subtypes')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'Subtypes'}
                            itemID='subtypes'
							onIonChange={changeHandler}
							value={place?.subtypes!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('Category')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'Category'}
                            itemID='category'
							onIonChange={changeHandler}
							value={place?.category!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('Address')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'Address'}
                            itemID='full_address'
							onIonChange={changeHandler}
							value={place?.full_address!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('Street')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'Street'}
                            itemID='street'
							onIonChange={changeHandler}
							value={place?.street!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr> 

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('Borough')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'Borough'}
                            itemID='borough'
							onIonChange={changeHandler}
							value={place?.borough!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr> 

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('City')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'City'}
                            itemID='city'
							onIonChange={changeHandler}
							value={place?.city!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr> 

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('State')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'State'}
                            itemID='state'
							onIonChange={changeHandler}
							value={place?.state!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr> 

                <tr>
                    <td colSpan={2}>
                        <IonImg src={place?.photo} class="photo" />
                    </td>
                </tr> 

                {/* <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('Xxxxx')}</IonLabel>
                    </td>
                    <td>
                    <IonInput
							type='text'
							placeholder={'Xxxxxx'}
                            itemID='nxxxx'
							onIonChange={changeHandler}
							value={place?.xxxx!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr>  */}

{/* 
    site text, 
    phone text, 
    postal_code text, 
    us_state text, 
    country text, 
    country_code text, 
    latitude double precision, 
    longitude double precision, 
    time_zone text, 
    plus_code text, 
    rating double precision, 
    reviews bigint, 
    reviews_link text, 
    reviews_per_score jsonb, 
    reviews_per_score_1 text, 
    reviews_per_score_2 text, 
    reviews_per_score_3 text, 
    reviews_per_score_4 text, 
    reviews_per_score_5 bigint, 
    photos_count bigint, 
    photo text, 
    street_view text, 
    working_hours jsonb, 
    working_hours_old_format text, 
    popular_times text, 
    business_status text, 
    about jsonb, 
    range text, 
    posts text, 
    verified boolean, 
    owner_id text, 
    owner_title text, 
    owner_link text, 
    reservation_links text, 
    booking_appointment_link text, 
    menu_link text, 
    order_links text, 
    location_link text, 
    place_id text NOT NULL, 
    google_id text, 
    reviews_id bigint */}

                {/* <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">
                        {t('Categories')}
                    </IonLabel>
                    </td>
                    <td>
                        <Chiplist 
                            title={t('Categories')}
                            id={'categories'}                            
                            options={categories}
                            index={-1}
                            //data={place?.categories! || []} 
                            data={place.categories || []} 
                            saveFunction={(newData: string[])=>{
                                const newPlace: any = {...place};
                                newPlace.categories = newData;
                                setPlace(newPlace);
                            }}/>
                    </td>
                </tr> */}


                {/* <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">{t('Notes')}</IonLabel>
                    </td>
                    <td>
                    <IonTextarea
							placeholder={'Notes'}
                            itemID='notes'
                            autoGrow={true}
                            inputMode='text'
							onIonChange={changeHandler}
							value={place?.notes!}
                            rows={3}
							class='inputBox'>
                    </IonTextarea>
                    </td>
                </tr> */}
                </tbody>
            </table>
            { !isNew &&
                <div className="ion-padding">
                    <IonButton fill="clear" expand="block" strong color="danger"
                        onClick={async ()=>{
                            const { data, error } = await supabaseDataService.deletePlace(id);
                            if (error) {
                                console.error('deletePlace error', error);
                                return;
                            } else {
                                history.replace('/places');
                            }
                        }}>
                        {t('delete')}
                    </IonButton>
                </div>
            }
            { !isNew &&
                <CommentsList topic={`place/${id}`}/>
            }
            {/* <pre>
                {JSON.stringify(org, null, 2)}
            </pre> */}

      </IonContent>
    </IonPage>
  );
}


export default Place;
