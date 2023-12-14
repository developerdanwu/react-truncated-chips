import {forwardRef, useState} from "react";
import {TruncatedChipGroup} from "react-truncated-chips";

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

const DummyInputContainer = ({children}:{children:React.ReactNode}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '500px',
      height: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      border:'1px solid black'
    }}>
      {children}
    </div>
  )
}

export default function DynamicListItems() {
  const [chipCount, setChipCount] = useState(1)

  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      gap:8,
    }}>
      <p style={{
        margin:0
      }}>adding dynamic items to the list</p>
      <button style={{
        width:'max-content'
      }} onClick={() => {
        setChipCount((prevState) => prevState + 1)
      }}>
        click to add chip to container
      </button>
      <DummyInputContainer>
        <TruncatedChipGroup>
          {Array(chipCount)
            .fill(0)
            .map((_, idx) => {
              return <DummyChip key={idx}>chip{idx + 1}</DummyChip>;
            })}
        </TruncatedChipGroup>
      </DummyInputContainer>

    </div>

  );
}