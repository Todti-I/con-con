import { ISkeletonProps, Skeleton } from 'native-base';

const SkeletonCard = (props: ISkeletonProps) => (
  <Skeleton
    h="128px"
    borderRadius={8}
    startColor="text.200"
    endColor="text.300"
    {...props}
  />
);

export default SkeletonCard;
