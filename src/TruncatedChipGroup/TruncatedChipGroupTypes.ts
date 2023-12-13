import React from 'react';

export interface TruncatedChipGroupProps<TChildElement> {
  /**
   * custom overflow indicator
   * @default <div>+{count}</div>
   * */
  renderOverflowIndicator?: (
    remainingChildren: Array<TChildElement>,
    overflowCount: number,
  ) => React.ReactNode;
  children: React.ReactNode;
  /**
   * spacing between elements. this is in pixels
   * @default 8
   * */
  spacing?: number;
  /**
   * offset from the right side of the container. This should be set to a little bigger than the
   * maximum size of the overflow indicator to prevent clipping. this is in pixels
   * @default 40
   * */
  containerBoundsXOffset?: number;
}
