import { Box, Flex, Heading } from 'native-base';
import { memo, useState } from 'react';
import FilterTag from './FilterTag';

type Props<T> = {
  name: string;
  filters: Array<{ id: T; name: string }>;
  defaultId?: T;
  onChoose?: (id?: T) => void;
};

const SelectionBlock = <T,>({
  defaultId,
  name,
  filters,
  onChoose,
}: Props<T>) => {
  const [chosenId, setChosenId] = useState(defaultId);

  const handleChoose = (id?: T) => () => {
    onChoose?.(id);
    setChosenId(id);
  };

  return (
    <Box p={4}>
      <Heading fontSize="xl" children={name} />
      <Flex flexDir="row" flexWrap="wrap" overflow="visible">
        {filters.map(({ id, name }, i) => (
          <FilterTag
            key={i}
            text={name}
            isActive={chosenId === id}
            onPress={handleChoose(chosenId === id ? undefined : id)}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default memo(SelectionBlock, (prevProps, nextProps) => {
  return prevProps.filters.length === nextProps.filters.length;
});
