import { IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { SupabaseAuthService, User } from 'ionic-react-supabase-login';
import { businessOutline, businessSharp, checkmarkOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import { Address as AddressObject } from '../../models/Models';
import Address from '../components/Address';
import Chiplist from '../components/Chiplist';
import CommentsList from '../components/CommentsList';
import GenericItemArrayEntry from '../components/GenericItemArrayEntry';
import ModalPhoto from '../components/ModalPhoto';
import { categories } from '../data/categories';
import { instantMessageTypes } from '../data/instantMessageTypes';
import { socialProfileTypes } from '../data/socialProfileTypes';
import SupabaseDataService from '../services/supabase.data.service'
import UtilityFunctionsService from '../services/utility.functions.service';

import "../translations/i18n";
import './Place.css';

const supabaseDataService = SupabaseDataService.getInstance()
const utils = UtilityFunctionsService.getInstance()
let _user: User | null = null

const Place: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(true);
    const [ openPhoto, setOpenPhoto ] = useState(false);

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

    const [ user, setUser ] = useState<any>(null);
    const [ profile, setProfile ] = useState<any>(null);
    useEffect(() => {
      const userSubscription = SupabaseAuthService.subscribeUser(setUser);
      const profileSubscription = SupabaseAuthService.subscribeProfile(setProfile);
      console.log('useEffect: id', id);
      if (id === 'new') {
          id = utils.uuidv4();
          setPlace({...initPlace, id: id});
          setShowLoading(false);
      } else {
          loadPlace(id);
      }    
      console.log('useEffect: id', id);
      return () => {
          SupabaseAuthService.unsubscribeUser(userSubscription);
          SupabaseAuthService.unsubscribeProfile(profileSubscription);
      }
  },[])
    
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
                        <IonImg src={place?.photo} class="photo" onClick={() =>{
                            setOpenPhoto(true);
                        }} />
                        <ModalPhoto url={place?.photo} title={place?.name!} showModal={openPhoto} setShowModal={setOpenPhoto} />
                    </td>
                </tr> 

                </tbody>
            </table>
            { !isNew &&
                <>
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
                <CommentsList topic={`place/${id}`}/>
                </>
            }

      </IonContent>
    </IonPage>
  );
}


export default Place;
