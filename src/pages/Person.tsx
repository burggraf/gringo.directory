import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonModal, IonPage, IonPopover, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { addSharp, airplaneOutline, airplaneSharp, calendar, checkmarkOutline, closeOutline, fastFoodOutline, fastFoodSharp, personOutline, personSharp, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { PersonObject } from '../../models/Person';
import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'
import Modal from '../components/Modal';
import Address from '../components/Address';
import { Address as AddressObject } from '../../models/Models';
import "../translations/i18n";
import './Person.css';
import { element } from 'prop-types';
import { string } from 'yargs';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
let _user: User | null = null


const Person: React.FC = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string; }>();

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

	const [ person, setPerson ] = useState<PersonObject>(initPerson);
    const [showModal, setShowModal] = useState<any>({currentModal: null});

    useEffect(() => {
        // Only run this one time!  No multiple subscriptions!
        supabaseAuthService.user.subscribe((user: User | null) => {
            _user = user
            console.log('Enjoy: subscribed: _user', _user)
        })
    }, []) // <-- empty dependency array
    
    const changeHandler = (e: any) => {
        const fld = e.srcElement.itemID;
        setPerson({ ...person, [fld]: e.detail.value! });
    }
    const saveNewAddress = (address: AddressObject) => {
        console.log('saveNewAddress', address);
        console.log('person', person);
        person.address?.push(address);
        setPerson(person);
        console.log('person', person);
    }
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
            <IonTitle>
                <IonIcon size="large" ios={personOutline} md={personSharp}></IonIcon>
              &nbsp;&nbsp;{t('Edit Person Details')}
            </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
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
                    <IonLabel style={{ maxWidth: '100px'}} slot='start' class="itemLabel">{t('Address')}</IonLabel>
                    {person?.address?.map((address: AddressObject, index: number) => {
                        return (
                            <IonLabel>address item: {address.name}</IonLabel>
                        )
                    })}
                    <Address data={null} type="new" saveFunction={saveNewAddress}/>
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

            <IonButton expand="block" color="primary" className="ion-margin-top">
                <IonIcon size="large" ios={save} md={save}></IonIcon>
                &nbsp;&nbsp;{t('Save')}
            </IonButton>
            <pre>
                { JSON.stringify(person, null, 2) }
            </pre>
            <pre>
                create table if not exists public.persons (
                id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                uid           UUID REFERENCES auth.users NULL,
                firstname     TEXT,
                middlename    TEXT,
                lastname      TEXT,
                nickname      TEXT,
                company       TEXT,
                photourl      TEXT NULL,
                dob           DATE NULL,
                anniversary   DATE NULL,  
                notes         TEXT NULL,
                created_at    TIMESTAMP DEFAULT NOW(),
                updated_at    TIMESTAMP DEFAULT NOW(),
                created_by    UUID REFERENCES auth.users,
                metadata      JSONB NULL,
                xtra          JSONB NULL
                );
            </pre>

      </IonContent>
    </IonPage>
  );
}


export default Person;
