import useAppContext from 'con-con/hooks/useAppContext';
import MainTabsScreen from './MainTabsScreen';
import WizardStack from './WizardStack';

const Screens = () => {
  const { isWizardComplete } = useAppContext();

  if (isWizardComplete.get) {
    return <MainTabsScreen />;
  }

  return <WizardStack />;
};

export default Screens;
