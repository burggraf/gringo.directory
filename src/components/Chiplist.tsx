import { IonChip, IonLabel } from '@ionic/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'
import UtilityFunctionsService from '../services/utility.functions.service';

import '../translations/i18n'
import './Chiplist.css'

interface ContainerProps {
	data: string[];
    index: number;
	id: string;
	title: string;
    saveFunction: Function;
	options: string[];
}

const utils = UtilityFunctionsService.getInstance()

const Chiplist: React.FC<ContainerProps> = ({ data, index, id, title, saveFunction, options }) => {
	// setShowModal({...showModal, currentModal: 'address'});
	const { t } = useTranslation()
	const [showModal, setShowModal] = useState<any>({ currentModal: null })
	const [localData, setLocalData] = useState<string[]>([])
	const changeHandler = (e: any) => {
		//const fld = e.srcElement.itemID
		const value = e.target.parentElement.id;
		let newData = [...localData];
		if (newData.indexOf(value) > -1) {
			// remove it from the array
			newData.splice(newData.indexOf(value), 1);
		} else {
			// add it to the array
			newData.push(value);
		}
		// remove empty strings
		newData = newData.filter((item) => item !== '');
		setLocalData(newData);
	}
    const saveHandler = () => {
        saveFunction(localData);
    }
	useEffect(() => {
		setLocalData(data);
	},[data]);
	return (
		<>
			<Modal
				key={`Chiplist-modal-${id}-${index}`}
				id={id}
				title={title}
				showModal={showModal}
				data={{ localData }}
                index={index}
				saveFunction={saveHandler}
				setShowModal={setShowModal}>
				{options.map((option, index) => {
					return (
						<IonChip 
								color="dark" 
								id={option}
								outline={localData.indexOf(option) === -1} 
								key={`Chiplist-item-${id}-${index}`}
								onClick={changeHandler}
						>
				            <IonLabel>{t(option)}</IonLabel>
          				</IonChip>
					)
				})}
			</Modal>
			{localData?.length === 0 &&
				<IonChip key={`chiplist-title-${title}`} color="dark" outline={false} onClick={()=>{setShowModal({currentModal: id})}}>
					<IonLabel>{t(title)}</IonLabel>
				</IonChip>
			}
			{localData?.length > 0 &&
				localData?.map((option, index) => {
					return (
						<IonChip 
								key={`chiplist-chip-id-${option}`}
								color="dark" 
								id={option}
								outline={false} 
								//key={`Chiplist-item-${id}-${index}`}
								onClick={()=>{setShowModal({currentModal: id})}}
						>
				            <IonLabel>{t(option)}</IonLabel>
          				</IonChip>
					)
				})			
			}
			{/* {JSON.stringify(localData)} */}
		</>
	)
}

export default Chiplist
