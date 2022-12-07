import 'react';

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;

  function memo<T extends React.ComponentType<any>>(
    Component: T,
    propsAreEqual?: (
      prevProps: Readonly<React.ComponentProps<T>>,
      nextProps: Readonly<React.ComponentProps<T>>
    ) => boolean
  ): T & { displayName?: string };
}
