import { TruncatedChipGroup } from 'react-truncated-chips';
import { forwardRef } from 'react';

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

export default function BasicTruncatedChipGroup() {
  return (
    <TruncatedChipGroup spacing={8} direction={'row-reverse'}>
      {Array(90)
        .fill(0)
        .map((_, idx) => {
          return <DummyChip key={idx}>chip{idx + 1}</DummyChip>;
        })}
    </TruncatedChipGroup>
  );
}
