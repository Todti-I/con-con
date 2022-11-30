export type UserData = {
  kilocalories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
};

export const defaultUserData = (): UserData => ({
  kilocalories: 0,
  carbohydrate: 0,
  protein: 0,
  fat: 0,
});
