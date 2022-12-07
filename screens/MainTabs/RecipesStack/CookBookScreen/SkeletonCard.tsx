import { ISkeletonProps, Skeleton } from 'native-base';

const SkeletonCard = (props: ISkeletonProps) => (
  <Skeleton
    flex={0.48}
    h="227.3px"
    borderRadius={8}
    startColor="text.200"
    endColor="text.300"
    {...props}
  />
);

export default SkeletonCard;
