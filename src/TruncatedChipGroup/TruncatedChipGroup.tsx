import React, {
  forwardRef,
  ReactElement,
  Ref,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useForkRef } from '../utils';
import { flushSync } from 'react-dom';
import { TruncatedChipGroupProps } from './TruncatedChipGroupTypes';

function getVisibleTagCount({
  containerBounds,
  containerBoundsXOffset,
  tags,
  totalTagCount,
  spacing,
}: {
  containerBoundsXOffset: number;
  spacing: number;
  totalTagCount: number;
  tags: HTMLElement[];
  containerBounds: DOMRect;
}) {
  let newVisibleTagCount = totalTagCount;
  for (let i = 0; i < tags.length; i += 1) {
    const tag = tags[i];
    // sometimes value can be null when removing values.
    // Ignoring these produces no bugs but can improve implementation
    if (!tag) {
      continue;
    }
    const tagBounds = tag.getBoundingClientRect();

    const chipPadding = spacing;
    if (
      tagBounds.right + chipPadding >
      containerBounds.right - containerBoundsXOffset
    ) {
      newVisibleTagCount = i;
      break;
    }
  }
  return newVisibleTagCount;
}

export const TruncatedChipGroup = forwardRef(function TruncatedChipGroup<
  TChildElement,
>(
  props: TruncatedChipGroupProps<TChildElement>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    direction = 'row',
    children,
    spacing = 8,
    containerBoundsXOffset = 40,
    renderOverflowIndicator = (_, count) => <div>+{count}</div>,
    ...others
  } = props;
  // slices the 'px' from the returned string of theme and converts it to a number to get the spacing factor
  const itemList = useRef<HTMLDivElement | null>(null);
  const forkedRef = useForkRef(itemList, ref);
  const shadowItemList = useRef<HTMLElement[]>([]);
  const childrenArray = React.Children.toArray(children);
  const reversedChildren =
    direction === 'row' ? childrenArray : [...childrenArray].reverse();
  const [visibleTagCount, setVisibleTagCount] = useState(childrenArray.length);
  useLayoutEffect(() => {
    if (itemList.current) {
      const newVisibleTagCount = getVisibleTagCount({
        containerBounds: itemList.current.getBoundingClientRect(),
        tags: shadowItemList.current,
        totalTagCount: reversedChildren.length,
        spacing: spacing,
        containerBoundsXOffset: containerBoundsXOffset,
      });
      queueMicrotask(() => {
        flushSync(() => {
          setVisibleTagCount(newVisibleTagCount);
        });
      });
    }

    const observer = new ResizeObserver(() => {
      if (itemList.current) {
        const newVal = getVisibleTagCount({
          containerBounds: itemList.current.getBoundingClientRect(),
          tags: shadowItemList.current,
          totalTagCount: reversedChildren.length,
          spacing: spacing,
          containerBoundsXOffset: containerBoundsXOffset,
        });

        flushSync(() => {
          setVisibleTagCount(newVal);
        });
      }
    });

    if (itemList.current) {
      observer.observe(itemList.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [containerBoundsXOffset, reversedChildren.length, spacing]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        gap: spacing,
        alignItems: 'center',
      }}
      ref={forkedRef}
      {...props}
    >
      {reversedChildren.slice(0, visibleTagCount)}
      {visibleTagCount < reversedChildren.length &&
        renderOverflowIndicator(
          // @ts-expect-error incorrect type inferrance
          reversedChildren.slice(visibleTagCount),
          reversedChildren.length - visibleTagCount,
        )}
      {React.cloneElement(
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            gap: spacing,
            alignItems: 'center',
            position: 'absolute',
            pointerEvents: 'none',
            left: 0,
            top: 0,
            visibility: 'hidden',
          }}
          ref={itemList}
        />,
        {
          children: reversedChildren.map((child, index) => {
            if (!React.isValidElement(child)) {
              return null;
            }
            return React.cloneElement(child, {
              // @ts-expect-error incorrect type inferrance
              ref: (_ref: HTMLElement) => {
                shadowItemList.current[index] = _ref;
              },
            });
          }),
        },
      )}
    </div>
  );
}) as <TChildElement>(
  p: TruncatedChipGroupProps<TChildElement> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
