import { useTranslation } from "react-i18next";
import { IonItemOptions, IonSelect, IonSelectOption } from '@ionic/react'

import "../translations/i18n";
import './Select.css';


interface ContainerProps {
  title: string;
  options: SelectOption[];
  value: any;
  handler: any; // onIonChange function
  itemID: string;
  slot?: string;
  color?: string;
  okText?: string;
  cancelText?: string;
}

interface SelectOption {
    value: string;
    text?: string;
}
  
const Select: React.FC<ContainerProps> = ({ title, options, value, handler, itemID, slot, color, okText, cancelText }) => {
  const { t } = useTranslation();
  return (
    <IonSelect slot={slot || "start"} className="ionSelect" color={color || "dark"}
        value={value} itemID={itemID} okText={okText || t('OK')} cancelText={cancelText || t('Cancel')}
        placeholder={title}
        interface="popover"
        interfaceOptions={{
            header: title,
        }}
        onIonChange={handler}
    >
        {options.map((option, index) => (
            <IonSelectOption value={option.value}>{typeof option.text === "undefined" ? option.value : option.text}</IonSelectOption>
        ))}
    </IonSelect>
  );
};

export default Select;
