import type { StorybookConfig } from '@storybook/react-vite';
import { getCodeEditorStaticDirs } from 'storybook-addon-code-editor/getStaticDirs';
import { withoutVitePlugins } from '@storybook/builder-vite';

const config: StorybookConfig = {
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      skipChildrenPropWithoutDoc: false,
      tsconfigPath: './tsconfig.json',
      propFilter: (prop) => {
        if (prop.name === 'children') {
          return true;
        }

        if (prop.parent) {
          return (
            !/@types\/react/.test(prop.parent.fileName) &&
            !/@emotion/.test(prop.parent.fileName)
          );
        }
        return true;
      },
    },
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    'storybook-addon-code-editor',
    {
      name: '@storybook/addon-essentials',
      options: {
        controls: false,
        actions: false,
      },
    },
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/preview-api',
  ],
  staticDirs: [...getCodeEditorStaticDirs()],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config, options) => {
    config.plugins = await withoutVitePlugins(config.plugins, ['vite:dts']);

    return config;
  },
  docs: {
    autodocs: true,
  },
};
export default config;
