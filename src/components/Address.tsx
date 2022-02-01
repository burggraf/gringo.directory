import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList } from '@ionic/react'
import { addOutline, addSharp, createOutline, createSharp } from 'ionicons/icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Address as AddressObject } from '../../models/Models'
import Modal from '../components/Modal'
import Select from '../components/Select'
import UtilityFunctionsService from '../services/utility.functions.service';

import '../translations/i18n'
import './Address.css'

interface ContainerProps {
	data: any;
    index: number;
    saveFunction: Function;
    deleteFunction?: Function;
}
const utils = UtilityFunctionsService.getInstance()

const Address: React.FC<ContainerProps> = ({ data, index, saveFunction, deleteFunction }) => {
	// setShowModal({...showModal, currentModal: 'address'});
	const { t } = useTranslation()
	const [showModal, setShowModal] = useState<any>({ currentModal: null })
	const [localData, setLocalData] = useState<any>({})
	const newAddress = (): AddressObject => {
		return {
			type: '',
			name: '', // location name
			address: '',
			address2: '',
			city: '',
			province: '',
			postalcode: '',
			country: '',
			pluscode: '',
			latitude: null,
			longitude: null,
		}
	}
	const changeHandler = (e: any) => {
		const fld = e.srcElement.itemID
		setLocalData({ ...localData, [fld]: e.detail.value! })
	}
    const saveHandler = () => {
        saveFunction('address', localData, index);
    }
    const deleteHandler = () => {
		if (deleteFunction) {
			deleteFunction('address', localData, index);
		}
    }
	return (
		<>
			<IonButton
				color='light'
				onClick={() => {
                    if (index === -1) {
                        setLocalData(newAddress());
                    } else {
                        setLocalData(data);
                    }            
					setShowModal({ ...showModal, currentModal: 'address' })
				}}>
				<IonIcon
					slot='icon-only'
					ios={index === -1 ? addOutline : createOutline}
					md={index === -1 ? addSharp : createSharp}
				/>
			</IonButton>
			<Modal
				id='address'
				title='Address'
				showModal={showModal}
				data={{ data }}
                index={index}
				saveFunction={saveHandler}
                deleteFunction={deleteFunction ? deleteHandler : undefined}
				setShowModal={setShowModal}>
				<IonList>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Type')}
						</IonLabel>
						<Select 
							title={t('Address Type')}
							itemID='type'
							options={[
								{ value: 'home', text: t('Home') },
								{ value: 'work', text: t('Work') },
								{ value: 'school', text: t('School') },
								{ value: 'mailing', text: t('Mailing') },
								{ value: 'other', text: t('Other') },
							]}
							value={localData.type!}
							handler={changeHandler}
						/>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Location Name')}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={'location name'}
							itemID='name'
							onIonChange={changeHandler}
							value={localData.name!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Address')}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={'address line 1'}
							itemID='address'
							onIonChange={changeHandler}
							value={localData.address!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Address2')}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={'address line 2'}
							itemID='address2'
							onIonChange={changeHandler}
							value={localData.address2!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('City')}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={'city'}
							itemID='city'
							onIonChange={changeHandler}
							value={localData.city!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Province')}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={'province'}
							itemID='province'
							onIonChange={changeHandler}
							value={localData.province!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Postal Code')}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={'postal code'}
							itemID='postalcode'
							onIonChange={changeHandler}
							value={localData.postalcode!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Country')}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={'country'}
							itemID='country'
							onIonChange={changeHandler}
							value={localData.country!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Plus Code')}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={'plus code'}
							itemID='pluscode'
							onIonChange={changeHandler}
							value={localData.pluscode!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Latitude')}
						</IonLabel>
						<IonInput
							type='number'
							placeholder={'latitude'}
							itemID='latitude'
							onIonChange={changeHandler}
							value={localData.latitude!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Longitude')}
						</IonLabel>
						<IonInput
							type='number'
							placeholder={'longitude'}
							itemID='longitude'
							onIonChange={changeHandler}
							value={localData.longitude!}
							class='inputBox'></IonInput>
					</IonItem>
				</IonList>
				{/* <pre>
					LocalData:
					{JSON.stringify(localData, null, 2)}
				</pre> */}
			</Modal>
		</>
	)
}

export default Address
