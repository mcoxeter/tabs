import * as React from 'react';

export const useIsOverflow = (
  ref: React.RefObject<HTMLElement | undefined>,
  callback?: (hasOverflow: boolean) => void
) => {
  const [isOverflow, setIsOverflow] = React.useState<boolean | undefined>(
    undefined
  );

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow =
        (current?.scrollHeight ?? 0) > (current?.clientHeight ?? 0);

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
