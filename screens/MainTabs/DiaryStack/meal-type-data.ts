import BreakfastIcon from 'con-con/icons/BreakfastIcon';
import DinnerIcon from 'con-con/icons/DinnerIcon';
import LunchIcon from 'con-con/icons/LunchIcon';
import SupperIcon from 'con-con/icons/SupperIcon';

const mealTypeData = {
  breakfast: {
    name: 'Завтрак',
    Icon: BreakfastIcon,
    mealCoefficient: 0.25,
    typeId: 1,
  },
  dinner: {
    name: 'Обед',
    Icon: DinnerIcon,
    mealCoefficient: 0.35,
    typeId: 2,
  },
  lunch: {
    name: 'Ужин',
    Icon: LunchIcon,
    mealCoefficient: 0.25,
    typeId: 2,
  },
  supper: {
    name: 'Перекус',
    Icon: SupperIcon,
    mealCoefficient: 0.05,
    typeId: 3,
  },
};

export default mealTypeData;
