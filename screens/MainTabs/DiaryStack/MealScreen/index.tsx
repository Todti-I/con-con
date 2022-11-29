import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RecipeData from 'con-con/types/recipe-data';
import { FlatList } from 'native-base';
import { useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDiaryContext } from '../context';
import DiaryWidget from '../DiaryWidget';
import mealTypeData from '../meal-type-data';
import { DiaryStackParamList } from '../types';
import AddMealButton from './AddMealButton';
import RecipeCard from './RecipeCard';

const MealScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<DiaryStackParamList, 'Meal'>) => {
  const { meals, subscriptions } = useDiaryContext();
  const mealType = route.params.mealType;

  useEffect(() => {
    navigation.setOptions({ headerTitle: mealTypeData[mealType].name });
    return () => {
      subscriptions.ping(`meal-card-${mealType}`);
    };
  }, []);

  const handleRemove = (id: number) => {
    const newRecipes = meals.get.get(mealType)?.filter((r) => r.id !== id);
    meals.get.set(mealType, newRecipes || []);
    subscriptions.ping('diary-widget');
  };

  const Header = (
    <>
      <DiaryWidget key="widget" />
      <AddMealButton
        mt={6}
        key="add-meal"
        onPress={() => navigation.navigate('AddMeal', { mealType })}
      />
    </>
  );

  const renderItem = ({ item }: ListRenderItemInfo<RecipeData>) => (
    <RecipeCard recipe={item} onRemove={handleRemove} />
  );

  return (
    <FlatList
      flex={1}
      bg="#F7F7F7"
      contentContainerStyle={{ padding: 16 }}
      renderItem={renderItem}
      ListHeaderComponent={Header}
      data={meals.get.get(mealType)}
      keyExtractor={(_, i) => i.toString()}
    />
  );
};

MealScreen.screenName = 'Meal' as const;

export default MealScreen;
