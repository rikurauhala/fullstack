import { Platform } from 'react-native';

const font = Platform.select({
  android: 'Roboto',
  ios: 'Arial',
  default: 'System',
});

const theme = {
  colors: {
    appBar: '#24292e',
    background: '#e1e4e8',
    error: '#d73a4a',
    light: '#ffffff',
    primary: '#0366d6',
    textPrimary: '#24292e',
    textSecondary: '#586069',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: font,
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
