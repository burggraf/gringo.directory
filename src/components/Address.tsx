import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../components/Modal'

import '../translations/i18n'
import './Address.css'
import { Address as AddressObject } from '../../models/Models'
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList } from '@ionic/react'
import { addOutline, addSharp, createOutline, createSharp, person } from 'ionicons/icons'

interface ContainerProps {
	data: any;
	type: string;
    saveFunction: Function;
}

const Address: React.FC<ContainerProps> = ({ data, type, saveFunction }) => {
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
	useEffect(() => {
		if (type === 'new') {
			setLocalData(newAddress())
		}
	}, [])
    const saveHandler = () => {
        console.log('save handler', localData)
        saveFunction(localData);
    }

	return (
		<>
			<IonButton
				color='light'
				onClick={() => {
					setShowModal({ ...showModal, currentModal: 'address' })
				}}>
				<IonIcon
					slot='icon-only'
					ios={type === 'new' ? addOutline : createOutline}
					md={type === 'new' ? addSharp : createSharp}
				/>
			</IonButton>
			<Modal
				id='address'
				title='Address'
				showModal={showModal}
				data={{ data }}
				saveFunction={saveHandler}
				setShowModal={setShowModal}>
				<IonList>
					<IonItem lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Type')}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={'type'}
							itemID='type'
							onIonChange={changeHandler}
							value={localData.type!}
							class='inputBox'></IonInput>
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
				<pre>
					LocalData:
					{JSON.stringify(localData, null, 2)}
				</pre>
			</Modal>
		</>
	)
}

export default Address
/*
  type: string;
  name?: string; // location name
  address: string;
  address2?: string;
  city: string;
  province?: string;
  postalcode?: string;
  country?: string;
  pluscode?: string;
  latitude?: number | null;
  longitude?: number | null;

*/
