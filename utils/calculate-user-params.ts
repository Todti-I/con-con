import { UserData } from 'con-con/types/user';
import { ActivityType, Gender, WizardData } from 'con-con/types/wizard-data';

const genderParams: Record<Gender, number> = {
  male: 5,
  female: -161,
};

const activityTypeParams: Record<ActivityType, number> = {
  low: 1.2,
  medium: 1.5,
  high: 1.9,
};

const calculateUserParams = (data: WizardData): UserData => {
  const age = Math.abs(
    new Date(Date.now() - new Date(data.birthday).getTime()).getUTCFullYear() -
      1970
  );

  const kilocalories =
    activityTypeParams[data.activityType] *
    (9.99 * data.weight +
      6.25 * data.growth -
      4.92 * age +
      genderParams[data.gender]);

  return {
    kilocalories: data.customKilocalories || Math.round(kilocalories),
    carbohydrate: Math.round(2 * data.weight),
    protein: Math.round(1.5 * data.weight),
    fat: Math.round(0.8 * data.weight),
  };
};

export default calculateUserParams;
