import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent } from "@ionic/react";
import { closeOutline, checkmarkOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import "../translations/i18n";
import './Modal.css';

interface ContainerProps {
  id: string; // modal id
  title: string;
  // const [showModal, setShowModal] = useState<any>({currentModal: null});
  showModal: any; 
  setShowModal: any;
  saveFunction?: Function;
  cancelFunction?: Function;
  data?: any;
  setData?: any;
  children?: React.ReactNode;
}

const Modal: React.FC<ContainerProps> = ({ 
    id, 
    title, 
    showModal, 
    setShowModal, 
    saveFunction, 
    cancelFunction, 
    data,
    setData,
    children 
}) => {
  const { t } = useTranslation();
  
  return (
    <IonModal 
    isOpen={showModal.currentModal! === id} 
    backdropDismiss={false}
    className='my-custom-class'>

    <IonHeader>
        <IonToolbar>
            <IonButtons slot='start'>
                <IonButton color='primary' onClick={()=>{
                    console.log('cancel here');
                    if (cancelFunction) {
                        cancelFunction();
                    }
                    setShowModal({ ...showModal, currentModal: null });
                }}>
                    <IonIcon size='large' icon={closeOutline}></IonIcon>
                </IonButton>
            </IonButtons>

            <IonTitle>
                {t(`${title}`)}
            </IonTitle>
            <IonButtons slot='end'>
                <IonButton color='primary' onClick={()=>{
                    console.log('save here');
                    if (setData && data) {
                        setData(data);
                    }
                    if (saveFunction) {
                        saveFunction(data);
                    }
                    setShowModal({ ...showModal, currentModal: null });
                }}>
                    <IonIcon size='large' icon={checkmarkOutline}></IonIcon>
                </IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
        {children}
    </IonContent>

    {/* <IonButton onClick={() => setShowModal({ ...showModal, currentModal: null })}>Close Modal</IonButton> */}
</IonModal>
);
};

export default Modal;
