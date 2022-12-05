import { Box, Flex, Heading } from 'native-base';
import { memo, useEffect, useState } from 'react';
import FilterTag from './FilterTag';

type Props<T> = {
  name: string;
  filters: Array<{ id: T; name: string }>;
  defaultIds?: T[];
  onChoose?: (id?: T[]) => void;
};

const MultipleSelectionBlock = <T,>({
  defaultIds,
  name,
  filters,
  onChoose,
}: Props<T>) => {
  const [chosenIds, setChosenIds] = useState(defaultIds || []);

  useEffect(() => {
    defaultIds && setChosenIds(defaultIds);
  }, [defaultIds]);

  const handleChoose = (id: T, isChosen: boolean) => () => {
    const newIds = chosenIds.filter((i) => i !== id);
    if (isChosen) {
      onChoose?.([...newIds, id]);
      setChosenIds([...newIds, id]);
    } else {
      onChoose?.(newIds);
      setChosenIds(newIds);
    }
  };

  return (
    <Box p={4}>
      <Heading fontSize="xl" children={name} />
      <Flex flexDir="row" flexWrap="wrap" overflow="visible">
        {filters.map(({ id, name }, i) => {
          const isChosen = chosenIds.includes(id);
          return (
            <FilterTag
              key={i}
              text={name}
              isActive={isChosen}
              onPress={handleChoose(id, !isChosen)}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default memo(MultipleSelectionBlock, (prevProps, nextProps) => {
  return prevProps.filters.length === nextProps.filters.length;
});
