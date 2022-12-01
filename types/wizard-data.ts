export type WizardData = {
  gender: Gender;
  birthday: Date;
  growth: number;
  weight: number;
  desiredWeight: number;
  activityType: ActivityType;
  preferences: string[];
  email: string;
};

export type Gender = 'male' | 'female';

export type ActivityType = 'low' | 'medium' | 'high';
