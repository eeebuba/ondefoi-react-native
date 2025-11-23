import { Theme as TNavigationTheme } from '@react-navigation/native';
import { alpha } from '@src/utils/theme';
import { TextStyle } from 'react-native';
import colors from './colors';

// ----------------------------------------------------------------------

const mainBlack = '#121214';
const mainWhite = '#FFFFFF';

// ----------------------------------------------------------------------

const palette = {
  primary: { ...colors.primary, contrastText: mainWhite },

  info: { ...colors.info, contrastText: mainWhite },
  success: { ...colors.success, contrastText: mainBlack },
  warning: { ...colors.warning, contrastText: mainBlack },
  error: { ...colors.error, contrastText: mainWhite },

  //

  background: {
    default: mainBlack,
    card: '#1b1b1f',
    paper: '#202024',
    neutral: '#29292E',
    elevated: '#323238',
    backdrop: alpha(mainBlack, 0.8),
  },
  text: {
    primary: mainWhite,
    secondary: '#E1E1E1',
    faded: '#8D8D99',
    disabled: '#323238',
  },
};

// ----------------------------------------------------------------------

const font = {
  weights: {
    bold: '800' as TextStyle['fontWeight'],
    medium: '600' as TextStyle['fontWeight'],
    regular: '500' as TextStyle['fontWeight'],
  },
};

// ----------------------------------------------------------------------

const navigationColors: TNavigationTheme['colors'] = {
  primary: palette.text.primary,
  background: mainBlack,
  card: palette.background.paper,
  text: palette.text.primary,
  border: palette.text.faded,
  notification: palette.text.primary,
};

// ----------------------------------------------------------------------

const theme = {
  dark: true,
  palette: palette,
  font: font,
  props: {
    borderRadius: { element: 6, card: 8, shape: 20 },
    padding: { element: 12 },
  },
  //
  colors: navigationColors, // used by react-navigation
};

// ----------------------------------------------------------------------

export { theme };
