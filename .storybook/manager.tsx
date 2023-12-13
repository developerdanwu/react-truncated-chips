import { create } from '@storybook/theming';
import { addons } from '@storybook/manager-api';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'SleekFlow UI',
    brandUrl: 'https://sleekflow.io/',
    brandTarget: '_self',
    brandImage: '/sleekflow-logo-navyblue.png',
  }),
  panelPosition: 'bottom',
});
