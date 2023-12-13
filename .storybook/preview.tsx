import type { Preview } from '@storybook/react';
import React from 'react';
import { setupMonaco } from 'storybook-addon-code-editor';
import {
  ArgsTable,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';

const preview: Preview = {
  decorators: [(Story) => <Story />],
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'label',
            enabled: false,
          },
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      toc: true,
      source: {
        language: 'tsx',
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable />
          <Stories />
        </>
      ),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

setupMonaco({
  onMonacoLoad(monaco) {
    monaco.editor.setTheme('vs-dark');
  },
});
export default preview;
