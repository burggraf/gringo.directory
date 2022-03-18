import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { checkmarkOutline, closeOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import "../translations/i18n";
import './ModalPhoto.css';

interface ContainerProps {
  url: string;
  title?: string;
  showModal: any; 
  setShowModal: any;
}

const ModalPhoto: React.FC<ContainerProps> = ({ 
    url, 
    title,
    showModal, 
    setShowModal, 
}) => {
  const { t } = useTranslation();
  
  return (
    <IonModal 
    isOpen={showModal} 
    backdropDismiss={false}
    // style={{'--height': '200px', '--width': '200px'}}
    style={{'--height': '90vh', '--width': '90vh'}}
    className='my-custom-class'>

    <IonHeader>
        <IonToolbar>
            <IonButtons slot='start'>
                <IonButton color='primary' onClick={()=>{
                    console.log('cancel here');
                    setShowModal(false);
                }}>
                    <IonIcon size='large' icon={closeOutline}></IonIcon>
                </IonButton>
            </IonButtons>

            <IonTitle>
                {t(`${title || ''}`)}
            </IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
        <IonImg src={url} 
        className="image-class"
        // style={{'objectFit': 'contain'}}
        alt="" />
    </IonContent>
    </IonModal>
  );
};

export default ModalPhoto;
