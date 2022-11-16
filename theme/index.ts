import { extendTheme } from 'native-base';

const theme = extendTheme({
  fontConfig: {
    Montserrat: {
      400: {
        normal: 'Montserrat-Regular',
      },
      500: {
        normal: 'Montserrat-Medium',
      },
      600: {
        normal: 'Montserrat-SemiBold',
      },
      700: {
        normal: 'Montserrat-Bold',
      },
    },
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
    mono: 'Montserrat',
  },
});

export default theme;
