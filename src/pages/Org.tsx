import { IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { businessOutline, businessSharp, checkmarkOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import { Address as AddressObject } from '../../models/Models';
import { Org as OrgObject } from '../../models/Org';
import Address from '../components/Address';
import GenericItemArrayEntry from '../components/GenericItemArrayEntry';
import Chiplist from '../components/Chiplist';
import SupabaseAuthService from '../Login/supabase.auth.service'
import SupabaseDataService from '../services/supabase.data.service'
import UtilityFunctionsService from '../services/utility.functions.service';

import CommentsList from '../components/CommentsList';

import "../translations/i18n";
import './Org.css';
import { categories } from '../data/categories';
import { instantMessageTypes } from '../data/instantMessageTypes';
import { socialProfileTypes } from '../data/socialProfileTypes';

const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()
const utils = UtilityFunctionsService.getInstance()
let _user: User | null = null

const Org: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(true);

    let { id } = useParams<{ id: string; }>();
    const isNew = (id === 'new');

    const initOrg: OrgObject = {
        id: id,
        name: '',
    }
	const [ org, setOrg ] = useState<OrgObject>(initOrg);

    const loadOrg = async (id: string) => {
        console.log('loadOrg...');
        const { data, error } = await supabaseDataService.getOrg(id);
        console.log('loadOrg...', data, 'error', error);
        if (error) {
            console.error('loadOrg error', error);
        } else {
            console.log('loadOrg data', data);
            setOrg(data);
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
            setOrg({...initOrg, id: id});
            setShowLoading(false);
        } else {
            loadOrg(id);
        }    
        console.log('useEffect: id', id);
    }, []) // <-- empty dependency array
    
    const changeHandler = (e: any) => {
        const fld = e.srcElement.itemID;
        setOrg({ ...org, [fld]: e.detail.value! });
    }
    const saveItem = (id: string, data: any, index: number) => {
        const newOrg: any = {...org};
        if (!newOrg[id]) { newOrg[id] = []; }
        if (index === -1) { index = (newOrg[id].length); }
        newOrg[id][index] = data;
        setOrg(newOrg);
    }
    const deleteItem = (id: string, data: any, index: number) => {
        console.log('deleteItem', id, data, index);
        const newOrg: any = {...org};
        if (newOrg[id] && newOrg[id].length >= (index -1)) {
            newOrg[id].splice(index, 1);
        }
        setOrg(newOrg);
    }
    const saveOrg = async () => {
        const { data, error } = await supabaseDataService.saveOrg(org);
        console.log('saveOrg: data', data, 'error', error);
    }

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/orgs" />
          </IonButtons>
            <IonTitle>
                <IonIcon size="large" ios={businessOutline} md={businessSharp}></IonIcon>
              &nbsp;&nbsp;{t('Edit Org Details')}
            </IonTitle>
            <IonButtons slot='end'>
                <IonButton color='primary' onClick={saveOrg}>
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
							value={org?.name!}
							class='inputBox'>
                    </IonInput>
                    </td>
                </tr>

                <tr>
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
                            //data={org?.categories! || []} 
                            data={org.categories || []} 
                            saveFunction={(newData: string[])=>{
                                const newOrg: any = {...org};
                                newOrg.categories = newData;
                                setOrg(newOrg);
                            }}/>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">
                        {t('Address')}<br/><Address data={{ownerid: id}} index={-1} saveFunction={saveItem}/>
                    </IonLabel>
                    </td>
                    <td>
                    <table className="multiBox"><tbody>
                        {org?.address?.map((address: AddressObject, index: number) => {
                            return (
                                <tr key={`address_${index}`}>
                                    <td className="multiBoxEntry">
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
                                    </td>
                                    <td className="ion-text-right">
                                    <IonLabel>
                                        <Address 
                                            data={address} 
                                            index={index} 
                                            saveFunction={saveItem}
                                            deleteFunction={deleteItem}
                                        />
                                    </IonLabel>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody></table>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">
                        {t('Email Address')}<br/>
                        <GenericItemArrayEntry 
                            title={t('Email Address')}
                            id={'email'}                            
                            attributes={[{'name': 'email','placeholder': 'Email Address'}]}
                            types={[{value: 'home'},{value: 'work'},{value: 'school'},{value: 'iCloud'},{value: 'other'}]}
                            data={null} index={-1} saveFunction={saveItem}/>
                    </IonLabel>
                    </td>
                    <td>
                    <table className="multiBox"><tbody>
                        {org?.email?.map((email: any, index: number) => {
                            return (
                                <tr key={`email_${index}`}>
                                    <td className="multiBoxEntry">
                                    <IonLabel>
                                        Type: {email.type}<br/>
                                        Email: {email.email}
                                    </IonLabel>
                                    </td>
                                    <td className="ion-text-right">
                                    <IonLabel>
                                    <GenericItemArrayEntry 
                                        title={t('Email Address')}
                                        id={'email'}                            
                                        attributes={[{'name': 'email','placeholder': 'Email Address'}]}
                                        types={[{value: 'home'},{value: 'work'},{value: 'school'},{value: 'iCloud'},{value: 'other'}]}
                                        data={email.email} index={index} 
                                        deleteFunction={deleteItem}
                                        saveFunction={saveItem}/>
                                    </IonLabel>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody></table>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">
                        {t('Web URL')}<br/>
                        <GenericItemArrayEntry 
                            title={t('Web URL')}
                            id={'url'}                            
                            attributes={[{'name': 'url','placeholder': 'URL'}]}
                            types={[{value: 'homepage'},{value: 'home'},{value: 'work'},{value: 'school'},{value: 'other'}]}
                            data={null} index={-1} saveFunction={saveItem}/>
                    </IonLabel>
                    </td>
                    <td>
                    <table className="multiBox"><tbody>
                        {org?.url?.map((item: any, index: number) => {
                            return (
                                <tr key={`url${index}`}>
                                    <td className="multiBoxEntry">
                                    <IonLabel>
                                        Type: {item.type}<br/>
                                        Email: {item.email}
                                    </IonLabel>
                                    </td>
                                    <td className="ion-text-right">
                                    <IonLabel>
                                    <GenericItemArrayEntry 
                                        title={t('Web URL')}
                                        id={'url'}                            
                                        attributes={[{'name': 'url','placeholder': 'URL'}]}
                                        types={[{value: 'homepage'},{value: 'home'},{value: 'work'},{value: 'school'},{value: 'other'}]}
                                        data={item} index={index} 
                                        deleteFunction={deleteItem}
                                        saveFunction={saveItem}/>
                                    </IonLabel>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody></table>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">
                        {t('Social Profile')}<br/>
                        <GenericItemArrayEntry 
                            title={t('Social Profile')}
                            id={'socialprofile'}                            
                            attributes={[{'name': 'url','placeholder': 'Social Profile URL'}]}
                            types={socialProfileTypes}
                            data={null} index={-1} saveFunction={saveItem}/>
                    </IonLabel>
                    </td>
                    <td>
                    <table className="multiBox"><tbody>
                        {org?.socialprofile?.map((item: any, index: number) => {
                            return (
                                <tr key={`socialprofile_${index}`}>
                                    <td className="multiBoxEntry">
                                    <IonLabel>
                                        Type: {item.type}<br/>
                                        URL: {item.url}
                                    </IonLabel>
                                    </td>
                                    <td className="ion-text-right">
                                    <IonLabel>
                                    <GenericItemArrayEntry 
                                        title={t('Social Profile')}
                                        id={'socialprofile'}                            
                                        attributes={[{'name': 'url','placeholder': 'Social Profile URL'}]}
                                        types={socialProfileTypes}
                                        data={item} 
                                        index={index} 
                                        deleteFunction={deleteItem}
                                        saveFunction={saveItem}/>
                                    </IonLabel>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody></table>
                    </td>
                </tr>

                <tr>
                    <td className="labelColumn">
                    <IonLabel class="itemLabel">
                        {t('Instant Message')}<br/>
                        <GenericItemArrayEntry 
                            title={t('Instant Message')}
                            id={'instantmessage'}                            
                            attributes={[{'name': 'handle','placeholder': 'Instant Message Handle'}]}
                            types={instantMessageTypes}
                            data={null} index={-1} saveFunction={saveItem}/>
                    </IonLabel>
                    </td>
                    <td>
                    <table className="multiBox"><tbody>
                        {org?.instantmessage?.map((item: any, index: number) => {
                            return (
                                <tr key={`instantmessage${index}`}>
                                    <td className="multiBoxEntry">
                                    <IonLabel>
                                        Type: {item.type}<br/>
                                        Handle: {item.handle}
                                    </IonLabel>
                                    </td>
                                    <td className="ion-text-right">
                                    <IonLabel>
                                    <GenericItemArrayEntry 
                                        title={t('Instant Message')}
                                        id={'instantmessage'}                            
                                        attributes={[{'name': 'handle','placeholder': 'Instant Message Handle'}]}
                                        types={instantMessageTypes}
                                        data={item} 
                                        index={index} 
                                        deleteFunction={deleteItem}
                                        saveFunction={saveItem}/>
                                    </IonLabel>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody></table>
                    </td>
                </tr>


                <tr>
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
							value={org?.notes!}
                            rows={3}
							class='inputBox'>
                    </IonTextarea>
                    </td>
                </tr>
                </tbody>
            </table>
            { !isNew &&
                <div className="ion-padding">
                    <IonButton fill="clear" expand="block" strong color="danger"
                        onClick={async ()=>{
                            const { data, error } = await supabaseDataService.deleteOrg(id);
                            if (error) {
                                console.error('deleteOrg error', error);
                                return;
                            } else {
                                history.replace('/orgs');
                            }
                        }}>
                        {t('delete')}
                    </IonButton>
                </div>
            }
            { !isNew &&
                <CommentsList topic={`org/${id}`}/>
            }
            {/* <pre>
                {JSON.stringify(org, null, 2)}
            </pre> */}

      </IonContent>
    </IonPage>
  );
}


export default Org;
