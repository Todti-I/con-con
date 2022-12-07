import { Box, HStack, Skeleton, Spacer, VStack } from 'native-base';

const props = {
  startColor: 'text.300',
  endColor: 'text.200',
};

const SkeletonScreen = () => (
  <Box>
    <Skeleton w="full" h="280px" {...props} />
    <VStack p={4} space={4}>
      <Skeleton h="27.6px" {...props} />
      <HStack space={2} alignItems="center">
        <Skeleton w="90px" h="22.2px" {...props} />
        <Spacer />
        <Skeleton w="65px" h="22.2px" {...props} />
      </HStack>
      <Skeleton h="20.7px" {...props} />
      <HStack space={2} justifyContent="space-between">
        <Skeleton flex={0.31} h="108px" borderRadius={8} {...props} />
        <Skeleton flex={0.31} h="108px" borderRadius={8} {...props} />
        <Skeleton flex={0.31} h="108px" borderRadius={8} {...props} />
      </HStack>
      <Skeleton h="19.6px" {...props} />
      <Skeleton h="20.7px" {...props} />
      <Skeleton h="150px" borderRadius={8} {...props} />
    </VStack>
  </Box>
);

export default SkeletonScreen;
