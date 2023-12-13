import { TruncatedChipGroup } from 'react-truncated-chips';
import { forwardRef, useState } from 'react';

const DummyChip = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
  function DummyChip(props, ref) {
    return (
      <div
        {...props}
        style={{
          border: '1px solid black',
          borderRadius: '500px',
          padding: '0px 20px',
        }}
        ref={ref}
      />
    );
  },
);

export default function TruncatedChipGroupCustomOverflowIndicator() {
  const [remainingChildren, setRemainingChildren] = useState<
    | React.ReactElement<{ children?: React.ReactNode }, typeof DummyChip>[]
    | undefined
  >(undefined);
  return (
    <div>
      <TruncatedChipGroup<
        React.ReactElement<{ children?: React.ReactNode }, typeof DummyChip>
      >
        containerBoundsXOffset={150}
        renderOverflowIndicator={(remainingChildren, count) => {
          return (
            <>
              <div
                onClick={() => {
                  setRemainingChildren((prevState) =>
                    prevState ? undefined : remainingChildren,
                  );
                }}
                style={{
                  width: '100px',
                  cursor: 'pointer',
                }}
              >
                click me to see {count} more
              </div>
            </>
          );
        }}
      >
        {Array(90)
          .fill(0)
          .map((_, idx) => {
            return <DummyChip key={idx}>chip{idx + 1}</DummyChip>;
          })}
      </TruncatedChipGroup>
      {remainingChildren && (
        <div>
          {remainingChildren
            .map((child) => {
              return child.props.children;
            })
            .join(', ')}
        </div>
      )}
    </div>
  );
}
