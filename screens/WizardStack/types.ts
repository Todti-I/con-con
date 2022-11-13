export type WizardStackParamList = {
  Welcome: undefined;
  Gender: undefined;
  Birthday: undefined;
  Growth: undefined;
  Weight: undefined;
  DesiredWeight: undefined;
  ActivityType: undefined;
  Preferences: undefined;
  Email: undefined;
};

export type WizardData = {
  gender: string;
  birthday: Date;
  growth: number;
  weight: number;
  desiredWeight: number;
  activityType: string;
  preferences: string[];
  email: string;
};
