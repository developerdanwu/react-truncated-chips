import { createLiveEditStory } from 'storybook-addon-code-editor';
import * as ReactTruncatedChips from '../index';
import { TruncatedChipGroup } from './TruncatedChipGroup';
import BasicTruncatedChipGroup from './examples/BasicTruncatedChipGroup.tsx?raw';
import TruncatedChipsWithCustomSpacingExample from './examples/TruncatedChipsWithCustomSpacing.tsx?raw';
import TruncatedChipGroupCustomOverflowIndicator from './examples/TruncatedChipGroupCustomOverflowIndicator.tsx?raw';
import TruncatedChipsDirectionExample from './examples/TruncatedChipsDirection.tsx?raw';
import DynamicListItemsExample from './examples/DynamicListItems.tsx?raw';

const meta = {
  title: 'TruncatedChipGroup',
  component: TruncatedChipGroup,
  parameters: {},
};

export default meta;

export const BasicTruncatedChips = createLiveEditStory({
  code: BasicTruncatedChipGroup,
  availableImports: {
    'react-truncated-chips': ReactTruncatedChips,
  },
});

export const TruncatedChipsWithCustomSpacing = createLiveEditStory({
  code: TruncatedChipsWithCustomSpacingExample,
  availableImports: {
    'react-truncated-chips': ReactTruncatedChips,
  },
});

export const TruncatedChipsWithCustomOverflowIndicator = createLiveEditStory({
  code: TruncatedChipGroupCustomOverflowIndicator,
  availableImports: {
    'react-truncated-chips': ReactTruncatedChips,
  },
});

export const ReverseDirectionOfChips = createLiveEditStory({
  code: TruncatedChipsDirectionExample,
  availableImports: {
    'react-truncated-chips': ReactTruncatedChips,
  },
});

export const DynamicListItems = createLiveEditStory({
  code: DynamicListItemsExample,
  availableImports: {
    'react-truncated-chips': ReactTruncatedChips,
  },
});
