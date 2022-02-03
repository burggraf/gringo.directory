import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList } from '@ionic/react'
import { addOutline, addSharp, createOutline, createSharp } from 'ionicons/icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'
import Select from './Select'
import UtilityFunctionsService from '../services/utility.functions.service';

import '../translations/i18n'
import './GenericItemArrayEntry.css'

interface Attr {
	name: string;
	type?: string;
	placeholder?: string;
}
interface ContainerProps {
	data: any;
	attributes: Attr[];
    index: number;
	id: string;
	title: string;
    saveFunction: Function;
    deleteFunction?: Function;
	types: SelectOption[];
}
interface SelectOption {
    value: string;
    text?: string;
}

const utils = UtilityFunctionsService.getInstance()

const GenericItemArrayEntry: React.FC<ContainerProps> = ({ data, attributes, index, id, title, saveFunction, deleteFunction, types }) => {
	// setShowModal({...showModal, currentModal: 'address'});
	const { t } = useTranslation()
	const [showModal, setShowModal] = useState<any>({ currentModal: null })
	const [localData, setLocalData] = useState<any>({})
	const newItem = (): any => {
		const item: any = { type: '' };
		attributes.map((attr) => {
			item[attr.name] = (attr.type === 'number') ? 0 : '';
		})
		return item;
	}
	const changeHandler = (e: any) => {
		const fld = e.srcElement.itemID
		setLocalData({ ...localData, [fld]: e.detail.value! })
	}
    const saveHandler = () => {
        saveFunction(id, localData, index);
    }
    const deleteHandler = () => {
		if (deleteFunction) {
        	deleteFunction(id, localData, index);
		}
    }
	return (
		<>
			<IonButton
				key={`GenericItemArrayEntry-button-${id}-${index}`}
				color='medium'
				fill='clear'
				onClick={() => {
                    if (index === -1) {
                        setLocalData(newItem());
                    } else {
                        setLocalData(data);
                    }            
					setShowModal({ ...showModal, currentModal: id })
				}}>
				<IonIcon
					slot='icon-only'
					ios={index === -1 ? addOutline : createOutline}
					md={index === -1 ? addSharp : createSharp}
				/>
			</IonButton>
			<Modal
				key={`GenericItemArrayEntry-modal-${id}-${index}`}
				id={id}
				title={title}
				showModal={showModal}
				data={{ data }}
                index={index}
				saveFunction={saveHandler}
                deleteFunction={(index > -1 ? deleteHandler: undefined)}
				setShowModal={setShowModal}>
				<IonList key={`GenericItemArrayEntry-list-${id}-${index}`}>
					<IonItem key={`GenericItemArrayEntry-select-${id}-${index}`} lines='none'>
						<IonLabel slot='start' class='itemLabel'>
							{t('Type')}
						</IonLabel>
						<Select 
							title={t(title)}
							itemID='type'
							options={types}
							value={localData.type!}
							handler={changeHandler}
						/>
					</IonItem>
					{attributes.map((attr, index) => (
						<IonItem lines='none' key={`GenericItemArrayEntry-input-${id}-${attr}-${index}`}>
						<IonLabel slot='start' class='itemLabel'>
							{t(attr.name)}
						</IonLabel>
						<IonInput
							type='text'
							placeholder={t(attr.placeholder || attr.name)}
							itemID={attr.name}
							onIonChange={changeHandler}
							value={localData[attr.name]!}
							class='inputBox'></IonInput>
						</IonItem>
					))}
				</IonList>
				{/* <pre>
					LocalData:
					{JSON.stringify(localData, null, 2)}
				</pre> */}
			</Modal>
		</>
	)
}

export default GenericItemArrayEntry
