import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonMenuButton, IonModal, IonPage, IonPopover, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { addSharp, airplaneOutline, airplaneSharp, calendar, checkmarkOutline, closeOutline, fastFoodOutline, fastFoodSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Person as PersonObject } from '../../models/Person';
import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'
import UtilityFunctionsService from '../services/utility.functions.service';
import Modal from '../components/Modal';
import Address from '../components/Address';
import { Address as AddressObject } from '../../models/Models';
import "../translations/i18n";
import './Person.css';
import { element } from 'prop-types';
import { boolean, string } from 'yargs';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
const utils = UtilityFunctionsService.getInstance()
let _user: User | null = null


const Person: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(true);

    let { id } = useParams<{ id: string; }>();
    const isNew = (id === 'new');

    const initPerson: PersonObject = {
        id: id,
        address: []
        // uid?: string;
        // firstname?: string;
        // middlename?: string;
        // lastname?: string;
        // nickname?: string;
        // company?: string;
        // photourl?: string;
        // dob?: string;
        // anniversary?: string;
        // notes?: string;
        // created_at?: string;
        // updated_at?: string;
        // created_by?: string;
        // metadata?: object;
        // xtra?: object;
        // email?: Email[];
        // phone?: Phone[];
        // url?: Url[];
        // address?: Address[];
        // relation?: Relation[];
        // socialProfile?: SocialProfile[];
        // instantMessage?: InstantMessage[];    
    }

    const loadPerson = async (id: string) => {
        console.log('loadPerson...');
        const { data, error } = await supabaseDataService.getPerson(id);
        console.log('loadPerson...', data, 'error', error);
        if (error) {
            console.error('loadPerson error', error);
        } else {
            console.log('loadPerson data', data);
            setPerson(data);
        }
        setShowLoading(false);
    }


	const [ person, setPerson ] = useState<PersonObject>(initPerson);
    const [showModal, setShowModal] = useState<any>({currentModal: null});

    useEffect(() => {
        // Only run this one time!  No multiple subscriptions!
        supabaseAuthService.user.subscribe((user: User | null) => {
            _user = user
            console.log('Enjoy: subscribed: _user', _user)
        });
        console.log('useEffect: id', id);
        if (id === 'new') {
            id = utils.uuidv4();
            setPerson({...initPerson, id: id});
        } else {
            loadPerson(id);
        }    
        console.log('useEffect: id', id);
    }, []) // <-- empty dependency array
    
    const changeHandler = (e: any) => {
        const fld = e.srcElement.itemID;
        setPerson({ ...person, [fld]: e.detail.value! });
    }
    const saveAddress = (address: AddressObject, index: number, deleteFlag: boolean = false) => {
        const newPerson = {...person};
        if (!newPerson.address) { newPerson.address = []; }
        if (index === -1) { index = (newPerson.address.length); }
        newPerson.address[index] = address;
        setPerson(newPerson);
    }
    const deleteAddress = (address: AddressObject, index: number) => {
        const newPerson = {...person};
        if (newPerson.address && newPerson.address.length >= (index -1)) {
            newPerson.address.splice(index, 1);
        }
        setPerson(newPerson);
    }
    const savePerson = async () => {
        const { data, error } = await supabaseDataService.savePerson(person);
        console.log('savePerson: data', data, 'error', error);
    }

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
            <IonBackButton defaultHref="/people" />
          </IonButtons>
            <IonTitle>
                <IonIcon size="large" ios={personOutline} md={personSharp}></IonIcon>
              &nbsp;&nbsp;{t('Edit Person Details')}
            </IonTitle>
            <IonButtons slot='end'>
                <IonButton color='primary' onClick={savePerson}>
                    <IonIcon size='large' icon={checkmarkOutline}></IonIcon>
                </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>

          <IonLoading isOpen={showLoading} message={'Loading, please wait...'} />

            <div className="ion-padding">View / Edit Person</div>
            <div className="ion-padding">id: {id}</div>

            <IonList>
                <IonListHeader>
                    <IonLabel>
                        <IonIcon size="large" ios={personOutline} md={personSharp}></IonIcon>
                        &nbsp;&nbsp;{t('Person Details')}
                    </IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                    <IonLabel slot='start' class="itemLabel">{t('First Name')}</IonLabel>
                    <IonInput
							type='text'
							placeholder={'First Name'}
                            itemID='firstname'
							onIonChange={changeHandler}
							value={person?.firstname!}
							class='inputBox'>
                    </IonInput>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel slot='start' class="itemLabel">{t('Middle Name')}</IonLabel>
                    <IonInput
							type='text'
							placeholder={'Middle Name'}
                            itemID='middlename'
							onIonChange={changeHandler}
							value={person?.middlename!}
							class='inputBox'>
                    </IonInput>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel slot='start' class="itemLabel">{t('Last Name')}</IonLabel>
                    <IonInput
							type='text'
							placeholder={'Last Name'}
                            itemID='lastname'
							onIonChange={changeHandler}
							value={person?.lastname!}
							class='inputBox'>
                    </IonInput>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel slot='start' class="itemLabel">{t('Nickname')}</IonLabel>
                    <IonInput
							type='text'
							placeholder={'Nickname'}
                            itemID='nickname'
							onIonChange={changeHandler}
							value={person?.nickname!}
							class='inputBox'>
                    </IonInput>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel slot='start' class="itemLabel">{t('Company')}</IonLabel>
                    <IonInput
							type='text'
							placeholder={'Company'}
                            itemID='company'
							onIonChange={changeHandler}
							value={person?.company!}
							class='inputBox'>
                    </IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonLabel slot='start' class="itemLabel">{t('Birthdate')}</IonLabel>
                    <IonInput 
                            type='date' 
                            itemID='dob'
                            onIonChange={changeHandler}
                            value={person?.dob!} 
                            class='inputBox' />
                </IonItem>

                <IonItem lines="none">
                    <IonLabel slot='start' class="itemLabel">{t('Anniversary')}</IonLabel>
                    <IonInput 
                            type='date' 
                            itemID='anniversary'
                            onIonChange={changeHandler}
                            value={person?.anniversary!} 
                            class='inputBox' />
                </IonItem>


                <IonItem lines="none">
                    <IonLabel style={{ maxWidth: '100px'}} slot='start' class="itemLabel">
                        {t('Address')}<br/><Address data={{ownerid: id}} index={-1} saveFunction={saveAddress}/>
                    </IonLabel>
                    <IonList style={{width: '100%'}}>
                        {person?.address?.map((address: AddressObject, index: number) => {
                            return (
                                <IonItem key={`address_${index}`}>
                                    <IonLabel>
                                    { address.type && <div>Type: {address.type}</div>}
                                    { address.name && <div>Location: {address.name}</div>}
                                    { address.address && <div>{address.address}</div>}
                                    { address.address2 && <div>{address.address2}</div>}
                                    { address.city && <div>City: {address.city}</div>}
                                    { address.province && <div>Province: {address.province}</div>}
                                    { address.postalcode && <div>Postal: {address.postalcode}</div>}
                                    { address.country && <div>Country: {address.country}</div>}
                                    { address.pluscode && <div>PlusCode: {address.pluscode}</div>}
                                    { address.latitude && <div>Lat/Lng: {address.latitude},{address.longitude}</div>}
                                    </IonLabel>
                                    <IonLabel slot="end">
                                        <Address 
                                            data={address} 
                                            index={index} 
                                            saveFunction={saveAddress}
                                            deleteFunction={deleteAddress}
                                        />
                                    </IonLabel>
                                </IonItem>
                            )
                        })}
                    </IonList>
                </IonItem>

                <IonItem lines="none">
                    <IonLabel slot='start' class="itemLabel">{t('Notes')}</IonLabel>
                    <IonTextarea
							placeholder={'Notes'}
                            itemID='notes'
                            autoGrow={true}
                            inputMode='text'
							onIonChange={changeHandler}
							value={person?.notes!}
                            rows={3}
							class='inputBox'>
                    </IonTextarea>
                </IonItem>
            </IonList>
            { !isNew &&
                <div className="ion-padding">
                    <IonButton fill="clear" expand="block" strong color="danger"
                        onClick={async ()=>{
                            const { data, error } = await supabaseDataService.deletePerson(id);
                            if (error) {
                                console.error('deletePerson error', error);
                                return;
                            } else {
                                history.replace('/people');
                            }
                        }}>
                        {t('delete')}
                    </IonButton>
                </div>
            }

      </IonContent>
    </IonPage>
  );
}


export default Person;
