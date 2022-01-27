import { useTranslation } from "react-i18next";

import "../translations/i18n";
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <strong>{name}</strong>
      <h2>{t("welcome")}</h2>
    </div>
  );
};

export default ExploreContainer;
