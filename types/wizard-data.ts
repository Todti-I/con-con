export type WizardData = {
  gender: Gender;
  birthday: Date;
  growth: number;
  weight: number;
  activityType: ActivityType;
  preferences: Preference[];
};

export type Gender = 'male' | 'female';

export type ActivityType = 'low' | 'medium' | 'high';

export type Preference = 'vegetarian' | 'soon';
